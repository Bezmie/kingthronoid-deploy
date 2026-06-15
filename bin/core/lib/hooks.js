const fs = require("fs");
const path = require("path");
const { parseHookFrontmatter, discoverProjects } = require("../../../wiki/bin/lib/public-api");

function loadHooksFromDir(dir, source) {
  if (!fs.existsSync(dir)) return [];
  const hooks = [];
  for (const entry of fs.readdirSync(dir).sort()) {
    if (!entry.endsWith(".md")) continue;
    const filePath = path.join(dir, entry);
    const content = fs.readFileSync(filePath, "utf-8");
    const fm = parseHookFrontmatter(content);
    if (!fm) continue;
    hooks.push({
      name: entry.replace(/\.md$/, ""),
      source,
      intent: fm.intent,
      signals: fm.signals,
      guard: fm.guard,
      filePath,
    });
  }
  return hooks;
}

function loadHooks(coreRoot, projectRoot) {
  const coreHooksDir = path.join(coreRoot, ".agents", "hooks");
  const hooks = loadHooksFromDir(coreHooksDir, "core");

  if (projectRoot) {
    const projName = path.basename(projectRoot);
    const projHooksDir = path.join(projectRoot, ".agents", "hooks");
    const projHooks = loadHooksFromDir(projHooksDir, "project:" + projName);
    hooks.push(...projHooks);
  }

  for (const p of discoverProjects(coreRoot)) {
    if (projectRoot && path.resolve(p.dir) === path.resolve(projectRoot)) continue;
    const projHooksDir = path.join(p.dir, ".agents", "hooks");
    hooks.push(...loadHooksFromDir(projHooksDir, "project:" + p.name));
  }

  return hooks;
}

function formatHooksTable(hooks) {
  const lines = [];
  const coreHooks = hooks.filter((h) => h.source === "core");
  const projHooks = hooks.filter((h) => h.source.startsWith("project"));

  if (coreHooks.length) {
    lines.push("CORE:");
    for (const h of coreHooks) {
      const sig = h.signals.join(", ");
      lines.push(`  ${h.name.padEnd(20)} | ${sig}`);
    }
  }

  const byProject = {};
  for (const h of projHooks) {
    const label = h.source.startsWith("project:")
      ? h.source.slice("project:".length)
      : "project";
    if (!byProject[label]) byProject[label] = [];
    byProject[label].push(h);
  }

  for (const [label, phooks] of Object.entries(byProject)) {
    lines.push(`PROJECT (${label}):`);
    for (const h of phooks) {
      const sig = h.signals.join(", ");
      lines.push(`  ${h.name.padEnd(20)} | ${sig}`);
    }
  }

  return lines.join("\n");
}

module.exports = { loadHooks, loadHooksFromDir, formatHooksTable };
