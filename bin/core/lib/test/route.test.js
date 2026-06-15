const { route, matchSignals, formatRouteResult, GUARD_REGISTRY } = require("../route");
const { evaluateGuard } = require("../route");
const assert = require("assert");

const mockHooks = [
  {
    name: "lint",
    source: "core",
    intent: "Check wiki health",
    signals: ["lint", "health", "check wiki"],
    guard: null,
    filePath: ".agents/hooks/lint.md",
  },
  {
    name: "balance",
    source: "project:kingthronoid",
    intent: "Change game balance numbers",
    signals: ["balance", "nerf", "buff"],
    guard: "project-context",
    filePath: "kingthronoid/.agents/hooks/balance.md",
  },
  {
    name: "refactor",
    source: "core",
    intent: "Reorganize wiki structure",
    signals: ["refactor", "clean", "organize"],
    guard: "suggest-lint",
    filePath: ".agents/hooks/refactor.md",
  },
];

const msgTokens = ["lint", "health"];
const lintHook = mockHooks[0];
const result = matchSignals(msgTokens, lintHook);
assert.strictEqual(result.matchCount, 2, "lint+health matched");
assert.ok(result.matched.includes("lint"), "lint in matched");
assert.ok(result.matched.includes("health"), "health in matched");

const noMatch = matchSignals(["deploy", "release"], lintHook);
assert.strictEqual(noMatch.matchCount, 0, "no match for deploy in lint hook");

const unknownGuard = evaluateGuard("nonexistent-guard", {});
assert.strictEqual(unknownGuard.pass, true, "unknown guard passes");
assert.ok(unknownGuard.note.includes("unknown guard"), "unknown guard has note");

const noMatchResult = formatRouteResult({ match: null, alternatives: [] });
assert.ok(noMatchResult.includes("QUERY mode"), "no match shows QUERY mode");

const matchResult = formatRouteResult({
  match: { name: "lint", source: "core", intent: "Check wiki health", guard: null, filePath: ".agents/hooks/lint.md", score: 2, matched: ["lint", "health"] },
  alternatives: [{ name: "refactor", score: 1, matched: ["organize"] }],
});
assert.ok(matchResult.includes("hook: lint"), "shows hook name");
assert.ok(matchResult.includes("alternatives"), "shows alternatives");

console.log("route: all passed");
