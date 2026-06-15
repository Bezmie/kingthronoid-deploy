const { evaluateGuard, GUARD_REGISTRY } = require("../route");
const assert = require("assert");

assert.ok(GUARD_REGISTRY["project-context"], "project-context guard registered");
assert.ok(GUARD_REGISTRY["suggest-lint"], "suggest-lint guard registered");
assert.ok(GUARD_REGISTRY["work-completed"], "work-completed guard registered");

const noGuard = evaluateGuard(null, {});
assert.strictEqual(noGuard.pass, true);

const projCtxPass = evaluateGuard("project-context", { projectLoaded: true });
assert.strictEqual(projCtxPass.pass, true);

const projCtxFail = evaluateGuard("project-context", { projectLoaded: false });
assert.strictEqual(projCtxFail.pass, false);
assert.ok(projCtxFail.remediation.includes("core start --root"));

const suggestLint = evaluateGuard("suggest-lint", {});
assert.strictEqual(suggestLint.pass, true);
assert.strictEqual(suggestLint.needsLint, true);

const workFail = evaluateGuard("work-completed", { hasLogEntry: false, hasGitDiff: false });
assert.strictEqual(workFail.pass, false);

const workPass = evaluateGuard("work-completed", { hasLogEntry: true, hasGitDiff: false });
assert.strictEqual(workPass.pass, true);

const workPass2 = evaluateGuard("work-completed", { hasLogEntry: false, hasGitDiff: true });
assert.strictEqual(workPass2.pass, true);

const fallback = evaluateGuard("unknown guard type", {});
assert.strictEqual(fallback.pass, true);
assert.ok(fallback.note.includes("unknown guard"), "unknown guard has note");

console.log("guard-registry: all passed");
