const { tokenize, normalizeTag, buildBrief, CANONICAL_EDGE_TYPES } = require("./index");
const { K1, B, bm25Score, computeIdf } = require("./shared/bm25");
const { basename, pageToResult } = require("./shared/result");

function cmdSearch(query, index, opts) {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const tagBoost = opts.tags
    ? opts.tags.split(",").map((t) => t.trim().toLowerCase())
    : [];

  let candidatePages;
  if (tagBoost.length > 0) {
    candidatePages = new Set();
    for (const page of index.pages) {
      const pageNormTags = page.meta.tags.map((x) => normalizeTag(x));
      const matchCount = tagBoost.filter((t) => pageNormTags.includes(normalizeTag(t))).length;
      if (matchCount > 0) candidatePages.add(page.pageName);
    }
    if (candidatePages.size === 0) return [];
  } else {
    candidatePages = null;
  }

  const subsetPages = candidatePages
    ? index.pages.filter((p) => candidatePages.has(p.pageName))
    : index.pages;
  const subsetTotalDocs = subsetPages.length;
  const subsetAvgDl = subsetPages.reduce((s, p) => s + p.docLen, 0) / (subsetTotalDocs || 1);

  const subsetInverted = Object.create(null);
  for (const page of subsetPages) {
    for (const term of Object.keys(page.termFreq)) {
      if (!subsetInverted[term]) subsetInverted[term] = [];
      subsetInverted[term].push(page.pageName);
    }
  }
  const subsetIdf = Object.create(null);
  for (const [term, docs] of Object.entries(subsetInverted)) {
    subsetIdf[term] = computeIdf(docs.length, subsetTotalDocs);
  }

  const scores = Object.create(null);
  for (const term of terms) {
    const docs = subsetInverted[term] || [];
    const termIdf = subsetIdf[term] || 0;
    for (const pageName of docs) {
      const page = index.nameToFile[pageName];
      if (!page) continue;
      const tf = page.termFreq[term] || 0;
      scores[pageName] = (scores[pageName] || 0) + bm25Score(tf, page.docLen, subsetAvgDl, termIdf);
    }
  }

  const results = [];
  for (const [pageName, score] of Object.entries(scores)) {
    const page = index.nameToFile[pageName];
    if (!page) continue;

    let finalScore = score;

    if (pageName === "log") {
      finalScore *= 0.5;
    }

    const typePriority = { concept: 1.05, entity: 1.0, project: 0.95, source: 0.9 };
    finalScore *= typePriority[page.meta.type] || 1.0;

    const titleTokens = tokenize(page.title);
    const queryTokens = new Set(terms);
    const titleOverlap = titleTokens.filter((t) => queryTokens.has(t)).length;
    if (titleOverlap > 0) {
      finalScore *= 1 + titleOverlap * 0.3;
    }

    const querySet = new Set(terms);
    const tagMatchCount = page.meta.tags.filter((t) => querySet.has(normalizeTag(t))).length;
    if (tagMatchCount > 0) {
      finalScore *= 1 + tagMatchCount * 0.4;
    }

    if (tagBoost.length > 0) {
      const matchCount = tagBoost.filter((t) =>
        page.meta.tags.map((x) => normalizeTag(x)).includes(normalizeTag(t))
      ).length;
      finalScore *= (1 + matchCount * 0.5);
    }

    results.push(pageToResult(page, { score: finalScore }));
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, opts.n || 10);
}

function cmdContext(query, index, opts) {
  const results = cmdSearch(query, index, opts);
  return results;
}

function cmdTags(tags, index) {
  const wanted = tags.split(",").map((t) => normalizeTag(t));
  const results = index.pages.filter((p) => {
    const pageTags = p.meta.tags.map((t) => normalizeTag(t));
    return wanted.every((t) => pageTags.includes(t));
  });
  results.sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
  return results.map((p) => pageToResult(p));
}

function cmdLinks(target, index) {
  const bn = basename(target);
  const incoming = index.linkMap[target] || index.linkMap[bn] || [];
  const results = incoming.map((pn) => {
    const page = index.nameToFile[pn];
    return page ? pageToResult(page) : null;
  }).filter(Boolean);
  for (const [link, sources] of Object.entries(index.linkMap)) {
    const linkBn = basename(link);
    if (linkBn === bn || link === target) {
      for (const pn of sources) {
        if (results.some((r) => r.name === pn)) continue;
        const page = index.nameToFile[pn];
        if (page) results.push(pageToResult(page));
      }
    }
  }
  return results;
}

function cmdBrief(index) {
  if (index.__brief) return index.__brief;
  return buildBrief(index);
}

function cmdList(index, opts) {
  const limit = opts.n && opts.n < index.pages.length ? opts.n : index.pages.length;
  return index.pages.slice(0, limit)
    .filter((p) => !opts.typeFilter || p.meta.type === opts.typeFilter)
    .map((p) => pageToResult(p, { sources: p.meta.sources || [] }));
}

function cmdEdges(pageName, index, opts) {
  const bn = basename(pageName);
  const page = index.nameToFile[pageName] || index.nameToFile[bn];
  if (!page) return { error: `Page not found: ${pageName}`, outgoing: [], incoming: [] };

  const outgoing = (page.edges || []).map((e) => {
    const targetBasename = e.target.startsWith("sys:") ? e.target.slice(4) : e.target;
    const resolved = index.nameToFile[targetBasename] || index.nameToFile[basename(targetBasename)];
    return {
      type: e.type,
      target: e.target,
      canonical: CANONICAL_EDGE_TYPES.has(e.type),
      resolved: !!resolved,
    };
  });

  const incoming = [];
  if (index.edgeMap) {
    for (const [edgeType, typeMap] of Object.entries(index.edgeMap)) {
      for (const [target, sourcePages] of Object.entries(typeMap)) {
        const matchTarget = target === pageName || target === bn;
        if (!matchTarget) {
          const resolved = index.nameToFile[target] || index.nameToFile[basename(target)];
          if (resolved && (resolved.pageName === pageName || basename(resolved.pageName) === bn)) {
            // matched via resolved name
          } else {
            continue;
          }
        }
        for (const srcPage of sourcePages) {
          const src = index.nameToFile[srcPage];
          incoming.push({
            type: edgeType,
            from: srcPage,
            fromTitle: src ? src.title : srcPage,
            canonical: CANONICAL_EDGE_TYPES.has(edgeType),
          });
        }
      }
    }
  }

  const edgeTypes = page.edgeTypes || [];
  const nonCanonical = edgeTypes.filter((t) => !CANONICAL_EDGE_TYPES.has(t));

  return { page: page.pageName, outgoing, incoming, edgeTypes, nonCanonical: nonCanonical.length > 0 ? nonCanonical : undefined };
}

module.exports = { cmdSearch, cmdContext, cmdTags, cmdLinks, cmdBrief, cmdList, cmdEdges };
