const { loadHooks } = require("./hooks");
const { tokenize } = require("../../../wiki/bin/lib/public-api");

// Guard context shape: { projectLoaded: boolean, hasLogEntry: boolean, hasGitDiff: boolean }
// hasLogEntry = true if wiki/log.md has entry for current session
// hasGitDiff = true if git diff is non-empty (uncommitted changes)
const GUARD_REGISTRY = {
  "project-context": {
    check: (ctx) => !!ctx.projectLoaded,
    remediation: "project context not loaded. run: core start --root <project>",
  },
  "suggest-lint": {
    check: () => true,
    sideEffect: "needsLint",
    note: "guard suggests running lint first",
  },
  "work-completed": {
    check: (ctx) => !!(ctx.hasLogEntry || ctx.hasGitDiff),
    remediation: "no completed work detected. commit changes and add log entry first",
  },
};

function evaluateGuard(guard, context) {
  if (!guard) return { pass: true };

  const handler = GUARD_REGISTRY[guard];
  if (handler) {
    const pass = handler.check(context);
    const result = { pass };
    if (!pass && handler.remediation) result.remediation = handler.remediation;
    if (pass && handler.sideEffect === "needsLint") {
      result.needsLint = true;
      result.note = handler.note;
    }
    return result;
  }

  return { pass: true, note: `unknown guard: ${guard}` };
}

function matchSignals(messageTokens, hook) {
  const allSignalTokens = [];
  for (const sig of hook.signals) {
    allSignalTokens.push(...tokenize(sig, { replaceSlashes: true }));
  }
  const sigSet = new Set(allSignalTokens);
  let matchCount = 0;
  const matched = [];
  for (const t of messageTokens) {
    if (sigSet.has(t)) {
      matchCount++;
      matched.push(t);
    }
  }
  return { matchCount, matched: [...new Set(matched)] };
}

function route(message, coreRoot, projectRoot) {
  const hooks = loadHooks(coreRoot, projectRoot);
  const msgTokens = tokenize(message, { replaceSlashes: true });
  if (msgTokens.length === 0) return { match: null, alternatives: [] };

  const scored = [];
  for (const hook of hooks) {
    const { matchCount, matched } = matchSignals(msgTokens, hook);
    if (matchCount > 0) {
      const intentTokens = new Set(tokenize(hook.intent, { replaceSlashes: true }));
      const intentBoost = msgTokens.filter((t) => intentTokens.has(t)).length;
      scored.push({ hook, matchCount, matched, score: matchCount + intentBoost * 0.5 });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    const aProj = a.hook.source.startsWith("project") ? 1 : 0;
    const bProj = b.hook.source.startsWith("project") ? 1 : 0;
    return bProj - aProj;
  });

  if (scored.length === 0) {
    return { match: null, alternatives: [] };
  }

  const best = scored[0];
  const alternatives = scored
    .slice(1, 4)
    .filter((s) => s.score >= best.score * 0.5)
    .map((s) => ({
      name: s.hook.name,
      score: s.score,
      matched: s.matched,
    }));

  return {
    match: {
      name: best.hook.name,
      source: best.hook.source,
      intent: best.hook.intent,
      guard: best.hook.guard,
      filePath: best.hook.filePath,
      score: best.score,
      matched: best.matched,
    },
    alternatives,
  };
}

function formatRouteResult(result) {
  if (!result.match) {
    return "no hook match. QUERY mode -- see start.md";
  }

  const m = result.match;
  const lines = [];
  lines.push(`hook: ${m.name} (${m.source})`);
  lines.push(`intent: ${m.intent}`);
  lines.push(`matched: ${m.matched.join(", ")} (${m.score})`);
  if (m.guard) {
    lines.push(`guard: ${m.guard}`);
  }

  if (result.alternatives.length > 0) {
    lines.push(
      `alternatives: ${result.alternatives.map((a) => a.name + "(" + a.score + ")").join(", ")}`
    );
  }

  return lines.join("\n");
}

const PROJECT_ALIASES = { king: "kingthronoid" };

module.exports = { route, evaluateGuard, matchSignals, formatRouteResult, GUARD_REGISTRY, PROJECT_ALIASES };
