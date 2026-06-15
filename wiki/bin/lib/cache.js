const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { walkDir } = require("./shared/walk");
const { basename } = require("./shared/result");

function computeMtimeHash(wikiDir) {
  const dir = wikiDir;
  const files = walkDir(dir, ".md");
  const mtimes = [];
  for (const f of files) {
    const stat = fs.statSync(f);
    mtimes.push(`${path.relative(dir, f)}:${stat.mtimeMs}`);
  }
  const binDir = path.join(dir, "bin", "lib");
  if (fs.existsSync(binDir)) {
    for (const f of fs.readdirSync(binDir).filter((f) => f.endsWith(".js"))) {
      const full = path.join(binDir, f);
      const stat = fs.statSync(full);
      mtimes.push(`bin/lib/${f}:${stat.mtimeMs}`);
    }
  }
  mtimes.sort();
  return crypto.createHash("sha256").update(mtimes.join("|")).digest("hex").slice(0, 16);
}

function buildBrief(index) {
  const typeCounts = Object.create(null);
  const tagCounts = Object.create(null);
  for (const p of index.pages) {
    const t = p.meta.type || "?";
    typeCounts[t] = (typeCounts[t] || 0) + 1;
    for (const tag of p.meta.tags) {
      const tl = tag.toLowerCase();
      tagCounts[tl] = (tagCounts[tl] || 0) + 1;
    }
  }
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([t, c]) => `${t}(${c})`)
    .join(", ");

  const recent = index.pages
    .filter((p) => p.meta.date)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
    .slice(0, 3)
    .map((p) => basename(p.pageName))
    .join(", ");

  const parts = [`${index.pages.length} pages`];
  for (const [t, c] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
    parts.push(`${t}(${c})`);
  }
  return { stats: parts.join(" | "), topTags, recent };
}

function loadOrBuild(wikiDir, buildIndexFn) {
  const CACHE_DIR = path.join(wikiDir, ".cache");
  const INDEX_CACHE = path.join(CACHE_DIR, "index.json");
  const currentHash = computeMtimeHash(wikiDir);

  if (fs.existsSync(INDEX_CACHE)) {
    try {
      const cached = JSON.parse(fs.readFileSync(INDEX_CACHE, "utf-8"));
      if (cached.mtimeHash === currentHash) {
        const index = cached.index;
        index.__brief = cached.brief;
        index.wikiDir = wikiDir;
        index.rawDir = path.join(wikiDir, "raw");
        return index;
      }
    } catch (_) {}
  }

  const index = buildIndexFn(wikiDir);
  const brief = buildBrief(index);

  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(INDEX_CACHE, JSON.stringify({ mtimeHash: currentHash, index, brief }), "utf-8");
  } catch (_) {}

  index.__brief = brief;
  index.wikiDir = wikiDir;
  index.rawDir = path.join(wikiDir, "raw");
  return index;
}

module.exports = { computeMtimeHash, buildBrief, loadOrBuild };
