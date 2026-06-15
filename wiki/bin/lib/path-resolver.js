const fs = require("fs");
const path = require("path");

const DEFAULT_WIKI_DIR = path.resolve(__dirname, "..", "..");

function findCoreRoot(startDir) {
  let dir = startDir || process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "wiki", "bin", "wiki.js"))) return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function resolveWikiRoot(startDir, rootFlag) {
  if (rootFlag === "core" || rootFlag === ".") {
    const core = findCoreRoot(startDir);
    return core ? path.join(core, "wiki") : DEFAULT_WIKI_DIR;
  }
  if (rootFlag && rootFlag !== "auto") {
    const core = findCoreRoot(startDir);
    if (core) {
      const pWiki = path.join(core, rootFlag, "wiki");
      if (fs.existsSync(pWiki)) return pWiki;
    }
    if (fs.existsSync(rootFlag)) return rootFlag;
  }
  const cwd = startDir || process.cwd();
  if (fs.existsSync(path.join(cwd, "wiki"))) return path.join(cwd, "wiki");
  const core = findCoreRoot(cwd);
  if (core) {
    const rel = path.relative(core, cwd);
    const projName = rel.split(path.sep)[0];
    if (projName && projName !== ".." && fs.existsSync(path.join(core, projName, "wiki"))) {
      return path.join(core, projName, "wiki");
    }
    return path.join(core, "wiki");
  }
  return DEFAULT_WIKI_DIR;
}

module.exports = { DEFAULT_WIKI_DIR, findCoreRoot, resolveWikiRoot };
