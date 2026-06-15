const fs = require("fs");
const path = require("path");
const { walkDir, SKIP_DIR_NAMES } = require("./shared/walk");
const { parseWikiFrontmatter } = require("./shared/frontmatter");
const { tokenize } = require("./shared/tokenize");
const { K1, B, computeIdf, computeTermFreq } = require("./shared/bm25");
const { discoverProjects } = require("./shared/projects");
const { DEFAULT_WIKI_DIR, findCoreRoot, resolveWikiRoot } = require("./path-resolver");
const { computeMtimeHash, buildBrief, loadOrBuild } = require("./cache");
const { basename } = require("./shared/result");

const SUMMARY_MAX_WORDS = 50;
const TAG_ALIASES = { patterns: "pattern", balancing: "balance" };
const CANONICAL_EDGE_TYPES = new Set(["uses", "caused", "fixes", "supersedes", "contradicts", "derived"]);

function findProjectWikis(coreRoot) {
  return discoverProjects(coreRoot, { checkWiki: true });
}

function normalizeTag(tag) {
  const lower = tag.toLowerCase();
  return TAG_ALIASES[lower] || lower;
}

function extractSummary(body, headings) {
  const lines = body.split(/\r?\n/);
  let start = 0;
  if (headings.length > 0) {
    const firstH = lines.findIndex((l) => /^#{1,6}\s+/.test(l));
    if (firstH >= 0) start = firstH + 1;
  }
  let inCode = false;
  const contentLines = [];
  for (let i = start; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("|") || trimmed.startsWith(">")) continue;
    contentLines.push(trimmed.replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/[*_`#]/g, ""));
    if (contentLines.join(" ").split(/\s+/).length >= SUMMARY_MAX_WORDS) break;
  }
  const text = contentLines.join(" ");
  const words = text.split(/\s+/).filter(Boolean);
  const summary = words.slice(0, SUMMARY_MAX_WORDS).join(" ");
  return summary + (words.length > SUMMARY_MAX_WORDS ? "..." : "");
}

function buildIndex(wikiDir) {
  const WIKI_DIR = wikiDir || DEFAULT_WIKI_DIR;
  const files = walkDir(WIKI_DIR, ".md");
  const pages = [];
  const inverted = Object.create(null);
  const linkMap = Object.create(null);
  const sysLinkMap = Object.create(null);
  const edgeMap = Object.create(null);
  const allEdgeTypes = new Set();
  const nameToFile = Object.create(null);
  const basenameMap = Object.create(null);
  let totalDocs = 0;

  for (const filePath of files) {
    const rel = path.relative(WIKI_DIR, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf-8");
    const { meta, body, links, sysLinks, edges, edgeTypes, headings } = parseWikiFrontmatter(content);

    const pageName = rel.replace(/\.md$/, "");
    const title = headings.length > 0 ? headings[0].text : pageName;
    const summary = extractSummary(body, headings);

    const tokens = tokenize(body + " " + meta.tags.join(" "));
    const termFreq = computeTermFreq(tokens);

    const docLen = tokens.length;
    const warnings = [];
    for (const line of body.split(/\r?\n/)) {
      if (line.includes("\u26A0\uFE0F") || line.includes("\u041F\u0440\u043E\u0442\u0438\u0432\u043E\u0440\u0435\u0447\u0438\u0435")) {
        warnings.push(line.trim());
      }
    }
    const page = { rel, pageName, title, summary, meta, docLen, termFreq, links, sysLinks, edges, edgeTypes, warnings, headings, body };
    pages.push(page);
    nameToFile[pageName] = page;
    const bn = basename(pageName);
    basenameMap[bn] = pageName;
    if (!nameToFile[bn]) {
      nameToFile[bn] = page;
    } else if (nameToFile[bn].pageName !== pageName) {
      console.error(`[index] basename collision: "${bn}" — ${nameToFile[bn].pageName} vs ${pageName}`);
    }

    for (const term of Object.keys(termFreq)) {
      if (!inverted[term]) inverted[term] = [];
      inverted[term].push(pageName);
    }

    for (const link of links) {
      if (!linkMap[link]) linkMap[link] = [];
      if (!linkMap[link].includes(pageName)) linkMap[link].push(pageName);
    }

    for (const src of meta.sources) {
      const srcLink = `sources/${src}`;
      if (!linkMap[srcLink]) linkMap[srcLink] = [];
      if (!linkMap[srcLink].includes(pageName)) linkMap[srcLink].push(pageName);
    }

    for (const sysLink of sysLinks) {
      if (!sysLinkMap[sysLink]) sysLinkMap[sysLink] = [];
      sysLinkMap[sysLink].push(pageName);
    }

    for (const edge of edges) {
      allEdgeTypes.add(edge.type);
      if (!edgeMap[edge.type]) edgeMap[edge.type] = Object.create(null);
      const typeMap = edgeMap[edge.type];
      const targetBasename = edge.target.startsWith("sys:") ? edge.target.slice(4) : edge.target;
      if (!typeMap[targetBasename]) typeMap[targetBasename] = [];
      if (!typeMap[targetBasename].includes(pageName)) typeMap[targetBasename].push(pageName);
    }

    totalDocs++;
  }

  const avgDocLen = pages.reduce((s, p) => s + p.docLen, 0) / (pages.length || 1);

  const idf = Object.create(null);
  for (const [term, docs] of Object.entries(inverted)) {
    idf[term] = computeIdf(docs.length, totalDocs);
  }

  return { pages, inverted, idf, linkMap, sysLinkMap, edgeMap, edgeTypes: [...allEdgeTypes], nameToFile, basenameMap, totalDocs, avgDocLen, wikiDir: WIKI_DIR };
}

function cachedLoadOrBuild(wikiDir) {
  const WIKI_DIR = wikiDir || resolveWikiRoot();
  return loadOrBuild(WIKI_DIR, buildIndex);
}

function loadAllWikis(coreRoot) {
  const root = coreRoot || findCoreRoot();
  if (!root) return [];
  const wikis = [];
  const coreIndex = cachedLoadOrBuild(path.join(root, "wiki"));
  wikis.push({ name: "core", index: coreIndex });
  for (const p of findProjectWikis(root)) {
    const pIndex = cachedLoadOrBuild(p.wikiDir);
    wikis.push({ name: p.name, index: pIndex });
  }
  return wikis;
}

module.exports = { DEFAULT_WIKI_DIR, walkDir, parseWikiFrontmatter, extractSummary, tokenize, buildIndex, loadOrBuild: cachedLoadOrBuild, buildBrief, computeMtimeHash, SKIP_DIR_NAMES, K1, B, TAG_ALIASES, CANONICAL_EDGE_TYPES, normalizeTag, findCoreRoot, findProjectWikis, resolveWikiRoot, loadAllWikis, basename };
