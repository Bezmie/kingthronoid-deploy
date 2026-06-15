const fs = require("fs");
const path = require("path");
const { DEFAULT_WIKI_DIR, tokenize, normalizeTag } = require("./index");
const { bm25Score, computeTermFreq } = require("./shared/bm25");
const { cmdCoverage, cmdGaps } = require("./lint");
const { cmdDiff } = require("./analytics");
const { basename: pageBasename } = require("./shared/result");

function cmdIngestPrep(rawFile, index) {
  const WIKI_DIR = index.wikiDir || DEFAULT_WIKI_DIR;
  const RAW_DIR = index.rawDir || path.join(WIKI_DIR, "raw");
  const rawBasename = path.basename(rawFile);
  const rawPath = path.join(RAW_DIR, rawBasename);

  if (!fs.existsSync(rawPath)) {
    return { error: `File not found: ${rawBasename}`, rawFile: rawBasename };
  }

  const content = fs.readFileSync(rawPath, "utf-8");
  const lines = content.split(/\r?\n/).length;
  const sizeBytes = Buffer.byteLength(content, "utf-8");
  const sizeKB = (sizeBytes / 1024).toFixed(1);

  const terms = tokenize(content);
  const termFreq = computeTermFreq(terms);
  const topTerms = Object.entries(termFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([t, c]) => `${t}(${c})`);

  const avgDl = index.avgDocLen;

  const scores = Object.create(null);
  const sortedTerms = Object.entries(termFreq).sort((a, b) => b[1] - a[1]).slice(0, 50).map((e) => e[0]);
  for (const term of sortedTerms) {
    const docs = index.inverted[term] || [];
    const termIdf = index.idf[term] || 0;
    for (const pageName of docs) {
      const page = index.nameToFile[pageName];
      if (!page) continue;
      const tf = page.termFreq[term] || 0;
      scores[pageName] = (scores[pageName] || 0) + bm25Score(tf, page.docLen, avgDl, termIdf);
    }
  }

  const relevant = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pageName, score]) => {
      const page = index.nameToFile[pageName];
      return page ? {
        name: page.pageName,
        type: page.meta.type,
        score: +score.toFixed(2),
        title: page.title,
        summary: page.summary,
      } : null;
    })
    .filter(Boolean);

  const rawTermSet = new Set(topTerms.map((t) => t.split("(")[0]));
  const overlappingTags = [];
  const tagSeen = new Set();
  for (const page of relevant) {
    for (const tag of (page.tags || [])) {
      const tl = tag.toLowerCase();
      if (rawTermSet.has(tl) && !tagSeen.has(tl)) {
        tagSeen.add(tl);
        overlappingTags.push(tag);
      }
    }
  }

  const tagPages = Object.create(null);
  if (overlappingTags.length > 0) {
    for (const page of index.pages) {
      for (const tag of overlappingTags) {
        if (page.meta.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())) {
          if (!tagPages[tag]) tagPages[tag] = [];
          tagPages[tag].push(pageBasename(page.pageName));
        }
      }
    }
  }

  const cov = cmdCoverage(index);
  const rawNameNoExt = rawBasename.replace(/\.md$/, "");
  const isCovered = !cov.uncovered.some((u) => u.includes(rawNameNoExt));

  const recommend = relevant.slice(0, 3).map((p) => pageBasename(p.name));

  return {
    rawFile: rawBasename,
    size: `${sizeKB} KB`,
    lines,
    topTerms,
    relevant,
    overlappingTags: overlappingTags.length > 0 ? overlappingTags : undefined,
    tagPages: Object.keys(tagPages).length > 0 ? tagPages : undefined,
    covered: isCovered,
    recommend,
  };
}

function cmdSynthesis(tag, index) {
  const tagLc = normalizeTag(tag);
  const tagPages = index.pages.filter((p) =>
    p.meta.tags.some((t) => normalizeTag(t) === tagLc)
  );

  const relatedTags = new Set();
  for (const p of tagPages) {
    for (const t of p.meta.tags) {
      const nt = normalizeTag(t);
      if (nt !== tagLc) relatedTags.add(nt);
    }
  }

  const relatedConcepts = index.pages.filter((p) => {
    if (p.meta.tags.some((t) => normalizeTag(t) === tagLc)) return false;
    return p.meta.tags.some((t) => relatedTags.has(normalizeTag(t)));
  });

  const sourceSet = new Set();
  for (const p of [...tagPages, ...relatedConcepts]) {
    for (const s of p.meta.sources) {
      sourceSet.add(s);
    }
  }
  const sources = [...sourceSet].map((s) => {
    const page = index.nameToFile[`sources/${s.replace(/\.md$/, "")}`] || index.nameToFile[s];
    return page ? { name: page.pageName, title: page.title } : { name: s };
  });

  const contradictions = [];
  for (const p of [...tagPages, ...relatedConcepts]) {
    for (const line of p.warnings || []) {
      contradictions.push({ page: p.pageName, line });
    }
  }

  const tagPageSet = new Set(tagPages.map((p) => p.pageName));
  const linkedButNotTag = [];
  for (const concept of relatedConcepts) {
    for (const link of concept.links) {
      if (!tagPageSet.has(link) && !relatedConcepts.find((c) => c.pageName === link)) {
        linkedButNotTag.push({ from: concept.pageName, target: link });
      }
    }
  }

  return {
    tag,
    tagPages: tagPages.map((p) => ({ name: p.pageName, type: p.meta.type, tags: p.meta.tags, title: p.title })),
    relatedTags: [...relatedTags],
    relatedConcepts: relatedConcepts.map((p) => ({ name: p.pageName, type: p.meta.type, tags: p.meta.tags, title: p.title })),
    sources,
    contradictions,
    linkedButNotTag: linkedButNotTag.length > 0 ? linkedButNotTag : undefined,
  };
}

function cmdCrystallizePrep(index, opts) {
  const diffResult = cmdDiff(opts, index.wikiDir);
  const changed = diffResult.changed;

  const relevantPages = [];
  const seen = new Set();
  for (const f of changed) {
    const terms = tokenize(f.file.replace(/[\/\\_.]/g, " "));
    for (const term of terms) {
      const docs = index.inverted[term] || [];
      for (const pageName of docs) {
        if (seen.has(pageName)) continue;
        seen.add(pageName);
        const page = index.nameToFile[pageName];
        if (page && page.pageName !== "log") {
          relevantPages.push({
            name: page.pageName,
            type: page.meta.type,
            tags: page.meta.tags,
            title: page.title,
          });
        }
      }
    }
  }
  relevantPages.sort((a, b) => {
    const prio = { concept: 0, entity: 1, source: 2 };
    return (prio[a.type] || 3) - (prio[b.type] || 3);
  });

  const gaps = cmdGaps(index);

  return {
    since: diffResult.since,
    lastLogDate: diffResult.lastLogDate,
    changedFiles: changed.length,
    changed: changed.slice(0, 10).map((c) => c.file),
    relevantPages: relevantPages.slice(0, 8),
    gaps: gaps.slice(0, 5).map((g) => ({ target: g.target, fromCount: g.fromCount })),
  };
}

module.exports = { cmdIngestPrep, cmdSynthesis, cmdCrystallizePrep };
