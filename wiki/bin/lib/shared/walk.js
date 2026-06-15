const fs = require("fs");
const path = require("path");

const SKIP_DIR_NAMES = new Set(["raw", ".cache", "bin"]);

function walkDir(dir, ext) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIR_NAMES.has(entry.name)) continue;
      results.push(...walkDir(full, ext));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

module.exports = { walkDir, SKIP_DIR_NAMES };
