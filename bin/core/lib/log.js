const fs = require("fs");
const path = require("path");
const { findCoreRoot, resolveWikiRoot } = require("../../../wiki/bin/lib/public-api");

function cmdLog(type, description, opts) {
  const coreRoot = opts.coreRoot || findCoreRoot(process.cwd());
  if (!coreRoot) return "error: CORE root not found";

  const root = opts.root || null;
  const wikiDir = root ? resolveWikiRoot(coreRoot, root) : resolveWikiRoot(coreRoot, "core");
  const logPath = path.join(wikiDir, "log.md");

  const date = new Date().toISOString().slice(0, 10);
  const header = `## [${date}] ${type}${description ? " | " + description : ""}`;

  const bodyLines = [];
  if (opts.kv) {
    for (const [k, v] of Object.entries(opts.kv)) {
      bodyLines.push(`- ${k}: ${v}`);
    }
  }

  const entry = [header, ...bodyLines].join("\n") + "\n";

  if (fs.existsSync(logPath)) {
    const content = fs.readFileSync(logPath, "utf-8");
    const firstEntryMatch = content.match(/^##\s/m);
    if (firstEntryMatch) {
      const insertPos = content.indexOf(firstEntryMatch[0]);
      const updated = content.slice(0, insertPos) + entry + "\n" + content.slice(insertPos);
      fs.writeFileSync(logPath, updated, "utf-8");
    } else {
      fs.writeFileSync(logPath, content.trimEnd() + "\n\n" + entry, "utf-8");
    }
  } else {
    fs.writeFileSync(logPath, `# Wiki Log\n\n${entry}`, "utf-8");
  }

  return `logged: ${type}${description ? " | " + description : ""} → ${path.relative(coreRoot, logPath)}`;
}

module.exports = { cmdLog };
