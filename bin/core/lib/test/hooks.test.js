const { loadHooksFromDir, formatHooksTable } = require("../hooks");
const assert = require("assert");

const hooks = loadHooksFromDir("nonexistent-dir", "test");
assert.strictEqual(hooks.length, 0, "nonexistent dir returns empty");

const coreHooksDir = require("path").join(
  require("path").resolve(__dirname, "../../../../.."),
  ".agents", "hooks"
);
const fs = require("fs");
if (fs.existsSync(coreHooksDir)) {
  const loaded = loadHooksFromDir(coreHooksDir, "core");
  assert.ok(loaded.length > 0, "core hooks dir has hooks");
  assert.ok(loaded.every((h) => h.name && h.source === "core"), "all hooks have name+source");
  assert.ok(loaded.some((h) => h.signals && h.signals.length > 0), "hooks have signals");
  const lintHook = loaded.find((h) => h.name === "lint");
  assert.ok(lintHook, "lint hook exists");
  assert.strictEqual(lintHook.guard, undefined, "lint has no guard");
  const refactorHook = loaded.find((h) => h.name === "refactor");
  assert.strictEqual(refactorHook.guard, "suggest-lint", "refactor guard = suggest-lint");

  const table = formatHooksTable(loaded);
  assert.ok(table.includes("CORE:"), "table has CORE section");
  assert.ok(table.includes("lint"), "table has lint hook");
}

console.log("hooks: all passed");
