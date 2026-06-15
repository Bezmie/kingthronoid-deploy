const fs = require("fs");
const path = require("path");

function discoverProjects(coreRoot, opts) {
  if (!coreRoot || !fs.existsSync(coreRoot)) return [];
  const checkWiki = opts && opts.checkWiki;
  const projects = [];
  for (const entry of fs.readdirSync(coreRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const sub = path.join(coreRoot, entry.name);
    if (!fs.existsSync(path.join(sub, "AGENTS.md"))) continue;
    if (checkWiki) {
      const wikiDir = path.join(sub, "wiki");
      if (!fs.existsSync(wikiDir)) continue;
      projects.push({ name: entry.name, dir: sub, wikiDir });
    } else {
      if (!fs.existsSync(path.join(sub, ".git"))) continue;
      projects.push({ name: entry.name, dir: sub });
    }
  }
  return projects;
}

module.exports = { discoverProjects };
