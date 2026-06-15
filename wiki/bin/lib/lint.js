const fs = require("fs");
const path = require("path");
const { CANONICAL_EDGE_TYPES, DEFAULT_WIKI_DIR, normalizeTag } = require("./index");
const { basename, pageToResult } = require("./shared/result");
const ROOT_PAGES = new Set(["index", "log"]);
const ORPHAN_EXEMPT_TYPES = new Set(["source"]);

function computeIncomingCounts(index) {
  const incomingCount = Object.create(null);
  for (const [target, sources] of Object.entries(index.linkMap)) {
    const resolved = index.nameToFile[target];
    const pageName = resolved ? resolved.pageName : target;
    incomingCount[pageName] = (incomingCount[pageName] || 0) + sources.length;
  }
  for (const page of index.pages) {
    for (const link of page.links) {
      const bn = basename(link);
      const resolved = index.nameToFile[link] || index.nameToFile[bn];
      if (resolved) {
        incomingCount[resolved.pageName] = (incomingCount[resolved.pageName] || 0) + 1;
      }
    }
  }
  for (const page of index.pages) {
    if (incomingCount[page.pageName]) continue;
    const bn = basename(page.pageName);
    if (bn !== page.pageName && incomingCount[bn]) {
      incomingCount[page.pageName] = incomingCount[bn];
    }
  }
  return incomingCount;
}

function resolveLink(link, nameToFile, basenameMap) {
  if (nameToFile[link]) return true;
  if (basenameMap && basenameMap[link]) return true;
  for (const name of Object.keys(nameToFile)) {
    if (basename(name) === link) return true;
  }
  return false;
}

function cmdBroken(index, coreIndex, projectIndexes) {
  const broken = [];
  const crossWikiHints = [];
  const coreNameToFile = coreIndex ? coreIndex.nameToFile : null;
  const coreBasenameMap = coreIndex ? coreIndex.basenameMap : null;
  const projIndexes = projectIndexes || [];
  for (const page of index.pages) {
    if (ROOT_PAGES.has(page.pageName)) continue;
    for (const link of page.links) {
      if (!resolveLink(link, index.nameToFile, index.basenameMap)) {
        const hint = findCrossWikiHint(link, projIndexes);
        broken.push({ from: page.pageName, target: link });
        if (hint) {
          crossWikiHints.push({ from: page.pageName, target: link, fix: `[[sys:${link}]]`, project: hint });
        }
      }
    }
    for (const sysLink of page.sysLinks) {
      if (!coreNameToFile) {
        if (!cmdBroken._coreWarningShown) {
          console.warn("WARNING: Core wiki not found. Cross-wiki link validation skipped.");
          cmdBroken._coreWarningShown = true;
        }
      } else if (!resolveLink(sysLink, coreNameToFile, coreBasenameMap)) {
        broken.push({ from: page.pageName, target: "sys:" + sysLink });
      }
    }
  }
  return { broken, crossWikiHints };
}

function findCrossWikiHint(link, projectIndexes) {
  for (const pi of projectIndexes) {
    if (resolveLink(link, pi.nameToFile, pi.basenameMap)) return pi.projectName;
  }
  return null;
}

function cmdBrokenEdges(index) {
  const broken = [];
  const nonCanonical = [];
  const seenNonCanonical = new Set();
  for (const page of index.pages) {
    if (ROOT_PAGES.has(page.pageName)) continue;
    for (const edge of (page.edges || [])) {
      const targetBasename = edge.target.startsWith("sys:") ? edge.target.slice(4) : edge.target;
      if (!resolveLink(targetBasename, index.nameToFile, index.basenameMap)) {
        broken.push({ from: page.pageName, type: edge.type, target: edge.target });
      }
      if (!CANONICAL_EDGE_TYPES.has(edge.type) && !seenNonCanonical.has(edge.type)) {
        seenNonCanonical.add(edge.type);
        nonCanonical.push(edge.type);
      }
    }
  }
  return { broken, nonCanonical };
}

function cmdOrphans(index) {
  const referenced = new Set();
  for (const target of Object.keys(index.linkMap)) {
    referenced.add(target);
    const resolved = index.nameToFile[target];
    if (resolved) referenced.add(resolved.pageName);
  }
  for (const page of index.pages) {
    for (const link of page.links) {
      referenced.add(link);
      const bn = basename(link);
      const resolved = index.nameToFile[link] || index.nameToFile[bn];
      if (resolved) referenced.add(resolved.pageName);
      if (bn !== link) referenced.add(bn);
    }
  }
  return index.pages
    .filter((p) => !referenced.has(p.pageName) && !referenced.has(basename(p.pageName)) && !ROOT_PAGES.has(p.pageName) && !ORPHAN_EXEMPT_TYPES.has(p.meta.type))
    .map((p) => pageToResult(p));
}

function cmdLint(index, coreIndex, projectIndexes) {
  const orphans = cmdOrphans(index);
  const { broken, crossWikiHints } = cmdBroken(index, coreIndex, projectIndexes);

  const rootPages = ROOT_PAGES;
  const incomingCount = computeIncomingCounts(index);
  const lowXref = index.pages
    .filter((p) => {
      if (rootPages.has(p.pageName)) return false;
      return (incomingCount[p.pageName] || 0) < 1;
    })
    .map((p) => pageToResult(p, { incomingLinks: incomingCount[p.pageName] || 0 }));

  const tagGroups = Object.create(null);
  for (const p of index.pages) {
    for (const tag of p.meta.tags) {
      const canonical = normalizeTag(tag);
      if (!tagGroups[canonical]) tagGroups[canonical] = new Set();
      tagGroups[canonical].add(tag);
    }
  }
  const tagVariants = Object.values(tagGroups)
    .filter((group) => group.size > 1)
    .map((group) => {
      const arr = [...group];
      const canonical = arr.find((t) => t === t.toLowerCase()) || arr[0];
      const nonCanonical = arr.filter((t) => t !== canonical);
      return { variants: arr, canonical, fix: nonCanonical.map((t) => `${t}→${canonical}`) };
    });

  const now = new Date();
  const staleThreshold = 30;
  const stale = index.pages
    .filter((p) => {
      if (!p.meta.date) return false;
      if (p.pageName === "log") return false;
      const d = new Date(p.meta.date);
      const daysDiff = (now - d) / (1000 * 60 * 60 * 24);
      return daysDiff > staleThreshold;
    })
    .map((p) => pageToResult(p, { date: p.meta.date }));

  const uncovered = cmdCoverage(index).uncovered;

  const unlinkedSources = index.pages
    .filter((p) => p.meta.type === "source" && (incomingCount[p.pageName] || 0) === 0)
    .map((p) => ({ name: p.pageName, title: p.title }));

  const brokenEdges = cmdBrokenEdges(index);

  const conventions = cmdConventions(index);

  return {
    orphans: { count: orphans.length, items: orphans },
    broken: { count: broken.length, items: broken, crossWikiHints },
    lowXref: { count: lowXref.length, items: lowXref },
    tagVariants: { count: tagVariants.length, items: tagVariants },
    stale: { count: stale.length, items: stale },
    uncovered: { count: uncovered.length, items: uncovered },
    unlinkedSources: { count: unlinkedSources.length, items: unlinkedSources },
    brokenEdges: { count: brokenEdges.broken.length, items: brokenEdges.broken, nonCanonical: brokenEdges.nonCanonical },
    conventions,
  };
}

function cmdGaps(index) {
  const gapMap = Object.create(null);
  for (const page of index.pages) {
    for (const link of page.links) {
      if (!resolveLink(link, index.nameToFile, index.basenameMap)) {
        if (!gapMap[link]) gapMap[link] = [];
        gapMap[link].push(page.pageName);
      }
    }
  }
  return Object.entries(gapMap)
    .map(([target, fromPages]) => ({ target, fromPages, fromCount: fromPages.length }))
    .sort((a, b) => b.fromCount - a.fromCount);
}

function cmdCoverage(index) {
  const RAW_DIR = index.rawDir || path.join(index.wikiDir || DEFAULT_WIKI_DIR, "raw");

  let rawFiles = [];
  try {
    rawFiles = fs.readdirSync(RAW_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch (_) {}

  const coveredBySources = new Set();
  for (const p of index.pages) {
    if (!p.meta.sources || p.meta.sources.length === 0) continue;
    for (const s of p.meta.sources) {
      const base = s.replace(/\.md$/, "");
      coveredBySources.add(base);
    }
  }

  const uncovered = rawFiles
    .filter((rf) => !coveredBySources.has(rf))
    .map((rf) => `raw/${rf}.md`);

  const covered = rawFiles.filter((rf) => coveredBySources.has(rf));

  return {
    total: rawFiles.length,
    covered: covered.length,
    uncovered,
  };
}

const PROMOTION_THRESHOLD = 3;

function cmdPromotion(index) {
  const candidates = [];
  const incomingCount = computeIncomingCounts(index);

  for (const page of index.pages) {
    if (page.meta.type === "entity") {
      const uniqueSources = (page.meta.sources || []).filter((s, i, arr) => arr.indexOf(s) === i);
      if (uniqueSources.length >= PROMOTION_THRESHOLD) {
        candidates.push({
          name: page.pageName,
          type: page.meta.type,
          suggestedType: "concept",
          sources: uniqueSources.length,
          sourceList: uniqueSources,
          title: page.title,
        });
      }
    }
    if (page.meta.type === "source") {
      const inc = incomingCount[page.pageName] || 0;
      const bn = basename(page.pageName);
      const incBasename = incomingCount[bn] || 0;
      const totalIncoming = Math.max(inc, incBasename);
      if (totalIncoming >= PROMOTION_THRESHOLD) {
        candidates.push({
          name: page.pageName,
          type: page.meta.type,
          suggestedType: "entity",
          incomingLinks: totalIncoming,
          title: page.title,
        });
      }
    }
  }

  return { threshold: PROMOTION_THRESHOLD, count: candidates.length, candidates };
}

const CYRILLIC_RE = /[\u0400-\u04FF]/;
const PATH_PREFIX_RE = /^(?:sources|entities|concepts|raw)\//;
const MAX_CROSS_REFS = 3;

function cmdConventions(index) {
  const nonEnglishHeaders = [];
  const nonEnglishTitles = [];
  const pathPrefixLinks = [];
  const overlinked = [];
  const emptySources = [];
  const missingTags = [];
  const untyped = [];
  const logWikiLinks = [];

  const emptySourcesItems = [];
  const missingTagsItems = [];
  const untypedItems = [];

  for (const page of index.pages) {
    if (page.pageName === "log") {
      const wikiLinkRe = /\[\[[^\]]+\]\]/g;
      const content = page.rawContent || "";
      const matches = content.match(wikiLinkRe);
      if (matches && matches.length > 0) {
        logWikiLinks.push({ page: "log", count: matches.length, links: matches.slice(0, 5) });
      }
      continue;
    }
    if (ROOT_PAGES.has(page.pageName)) continue;

    for (const h of (page.headings || [])) {
      if (CYRILLIC_RE.test(h.text)) {
        if (h.level === 1) {
          nonEnglishTitles.push({ page: page.pageName, text: h.text });
        } else {
          nonEnglishHeaders.push({ page: page.pageName, level: h.level, text: h.text });
        }
      }
    }

    for (const link of page.links) {
      if (PATH_PREFIX_RE.test(link)) {
        pathPrefixLinks.push({ page: page.pageName, link });
      }
    }

    const relatedSection = findRelatedLinks(page);
    if (relatedSection.length > MAX_CROSS_REFS) {
      overlinked.push({ page: page.pageName, count: relatedSection.length, links: relatedSection });
    }

    if (page.meta.sources && page.meta.sources.length === 0 && page.meta.type !== "log") {
      emptySourcesItems.push(page.pageName);
    }

    if (!page.meta.tags || page.meta.tags.length === 0) {
      missingTagsItems.push(page.pageName);
    }

    const hasTypedEdge = page.edges && page.edges.length > 0;
    if (!hasTypedEdge && page.meta.type !== "source" && page.meta.type !== "log") {
      untypedItems.push(page.pageName);
    }
  }

  return {
    nonEnglishTitles: { count: nonEnglishTitles.length, items: nonEnglishTitles },
    nonEnglishHeaders: { count: nonEnglishHeaders.length, items: nonEnglishHeaders },
    pathPrefixLinks: { count: pathPrefixLinks.length, items: pathPrefixLinks },
    overlinked: { count: overlinked.length, items: overlinked },
    emptySources: { count: emptySourcesItems.length, items: emptySourcesItems },
    missingTags: { count: missingTagsItems.length, items: missingTagsItems },
    untyped: { count: untypedItems.length, items: untypedItems },
    logWikiLinks: { count: logWikiLinks.length, items: logWikiLinks },
  };
}

function findRelatedLinks(page) {
  const body = page.body || "";
  const lines = body.split(/\r?\n/);
  let inRelated = false;
  const relatedLinks = [];
  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      const text = headingMatch[1].trim().toLowerCase();
      inRelated = text === "related" || text === "связанные страницы" || text === "связи";
      continue;
    }
    if (!inRelated) continue;
    const linkMatches = [...line.matchAll(/\[\[([^\]]+)\]\]/g)];
    for (const m of linkMatches) {
      relatedLinks.push(m[1]);
    }
  }
  return relatedLinks;
}

module.exports = { resolveLink, cmdOrphans, cmdBroken, cmdLint, cmdGaps, cmdCoverage, cmdBrokenEdges, cmdPromotion, findCrossWikiHint, computeIncomingCounts };