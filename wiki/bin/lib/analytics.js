const fs = require("fs");
const path = require("path");
const { DEFAULT_WIKI_DIR } = require("./index");
const { walkDir } = require("./shared/walk");
const { basename } = require("./shared/result");

function parseLog(wikiDir) {
  const WIKI_DIR = wikiDir || DEFAULT_WIKI_DIR;
  const logPath = path.join(WIKI_DIR, "log.md");
  if (!fs.existsSync(logPath)) return [];

  const content = fs.readFileSync(logPath, "utf-8");
  const entries = [];

  const re = /^## \[(\d{4}-\d{2}-\d{2})\]\s+(\w+)\s*\|\s*(.+)$/gm;
  let match;
  const positions = [];

  while ((match = re.exec(content)) !== null) {
    positions.push({
      date: match[1],
      type: match[2],
      description: match[3].trim(),
      index: match.index,
    });
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : content.length;
    const body = content.slice(start, end).replace(/^## \[.*$/m, "").trim();
    entries.push({
      date: positions[i].date,
      type: positions[i].type,
      description: positions[i].description,
      body,
    });
  }

  return entries;
}

function cmdLogLast(n, wikiDir) {
  const entries = parseLog(wikiDir);
  return entries.slice(-n).reverse();
}

function cmdLogStats(wikiDir) {
  const entries = parseLog(wikiDir);
  if (entries.length === 0) return { total: 0, byType: {}, byDate: {}, period: "" };

  const byType = {};
  const byDate = {};

  for (const e of entries) {
    byType[e.type] = (byType[e.type] || 0) + 1;
    const month = e.date.slice(0, 7);
    byDate[month] = (byDate[month] || 0) + 1;
  }

  const dates = entries.map((e) => e.date).sort();
  const period = dates.length > 0 ? `${dates[0]} .. ${dates[dates.length - 1]}` : "";

  return { total: entries.length, byType, byDate, period };
}

function cmdLogSince(sinceDate, wikiDir) {
  const entries = parseLog(wikiDir);
  return entries.filter((e) => e.date >= sinceDate).reverse();
}

function cmdDiff(opts, wikiDir) {
  const WIKI_DIR = wikiDir || DEFAULT_WIKI_DIR;
  const entries = parseLog(WIKI_DIR);
  const lastLogDate = entries.length > 0
    ? entries.map((e) => e.date).sort().pop()
    : "1970-01-01";

  const files = walkDir(WIKI_DIR, ".md");

  const since = opts.since || lastLogDate;
  const changed = [];

  for (const filePath of files) {
    const stat = fs.statSync(filePath);
    const mtime = stat.mtime.toISOString().slice(0, 10);
    if (mtime > since) {
      const rel = path.relative(WIKI_DIR, filePath).replace(/\\/g, "/");
      changed.push({ file: rel, modified: mtime });
    }
  }

  changed.sort((a, b) => b.modified.localeCompare(a.modified));
  return { since, lastLogDate, changed };
}

function cmdGraph(index, format) {
  const edges = [];
  const seen = new Set();

  for (const page of index.pages) {
    if (page.pageName === "log") continue;
    for (const edge of (page.edges || [])) {
      const targetBasename = edge.target.startsWith("sys:") ? edge.target.slice(4) : edge.target;
      const target = index.nameToFile[targetBasename] || index.nameToFile[basename(targetBasename)];
      if (!target) continue;
      const targetName = target.pageName;
      if (targetName === "log") continue;

      const key = `${page.pageName}→${targetName}::${edge.type}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: page.pageName, to: targetName, type: edge.type });
    }
    for (const link of page.links) {
      const target = index.nameToFile[link] || index.nameToFile[basename(link)];
      if (!target) continue;
      const targetName = target.pageName;
      if (targetName === "log") continue;

      const typedKey = `${page.pageName}→${targetName}::`;
      const hasTyped = page.edges && page.edges.some((e) => {
        const eBasename = e.target.startsWith("sys:") ? e.target.slice(4) : e.target;
        const eResolved = index.nameToFile[eBasename] || index.nameToFile[basename(eBasename)];
        return eResolved && eResolved.pageName === targetName;
      });
      if (hasTyped) continue;

      const key = `${page.pageName}→${targetName}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: page.pageName, to: targetName });
    }
  }

  if (format === "dot") {
    const lines = ["digraph wiki {"];
    lines.push('  rankdir=LR;');
    for (const e of edges) {
      const label = e.type ? ` [label="${e.type}"]` : "";
      lines.push(`  "${e.from}" -> "${e.to}"${label};`);
    }
    lines.push("}");
    return lines.join("\n");
  }

  const lines = ["graph LR"];
  for (const e of edges) {
    const fromBasename = basename(e.from);
    const toBasename = basename(e.to);
    const label = e.type ? `|${e.type}|` : "";
    lines.push(`  ${fromBasename} -->${label} ${toBasename}`);
  }
  return lines.join("\n");
}

module.exports = { cmdLogLast, cmdLogStats, cmdLogSince, cmdDiff, cmdGraph, parseLog };
