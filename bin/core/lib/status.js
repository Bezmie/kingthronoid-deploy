const { execSync } = require("child_process");
const path = require("path");
const {
  findCoreRoot,
  loadOrBuild,
  resolveWikiRoot,
  cmdLint,
  cmdBrief,
  cmdDiff,
} = require("../../../wiki/bin/lib/public-api");
const { listProjects, loadProjectInfo } = require("./projects");
const { evaluateGuard } = require("./route");
const { loadHooks } = require("./hooks");

function getGitStatus(dir) {
  try {
    const output = execSync("git status --porcelain", {
      cwd: dir,
      encoding: "utf-8",
      timeout: 5000,
    });
    const lines = output.trim().split(/\r?\n/).filter(Boolean);
    return { uncommitted: lines.length, details: lines.slice(0, 5) };
  } catch {
    return { uncommitted: -1, details: [] };
  }
}

function getWikiBrief(coreRoot, projName) {
  const wikiDir = projName
    ? resolveWikiRoot(undefined, projName)
    : path.join(coreRoot, "wiki");
  const index = loadOrBuild(wikiDir);
  return cmdBrief(index);
}

function getWikiLint(coreRoot) {
  const wikiDir = path.join(coreRoot, "wiki");
  const index = loadOrBuild(wikiDir);
  return cmdLint(index);
}

function getWikiUnlogged(coreRoot, projName) {
  const wikiDir = projName
    ? resolveWikiRoot(undefined, projName)
    : path.join(coreRoot, "wiki");
  const index = loadOrBuild(wikiDir);
  const diffResult = cmdDiff({}, index.wikiDir);
  return diffResult.changed.length;
}

function cmdStart(coreRoot, projectRoot) {
  if (!coreRoot) coreRoot = findCoreRoot(process.cwd());
  if (!coreRoot) return "error: CORE root not found";

  const coreBrief = getWikiBrief(coreRoot);
  const coreLint = getWikiLint(coreRoot);
  const coreUnlogged = getWikiUnlogged(coreRoot);
  const projects = listProjects(coreRoot);

  const lines = [];

  lines.push(`wiki: ${coreBrief.stats.split(" | ")[0]} | ${coreBrief.topTags.split(", ").slice(0, 3).join(", ")}`);
  const issues = [];
  if (coreLint.broken.count > 0) issues.push(`${coreLint.broken.count} broken`);
  if (coreLint.orphans.count > 0) issues.push(`${coreLint.orphans.count} orphans`);
  if (coreLint.stale.count > 0) issues.push(`${coreLint.stale.count} stale`);
  lines.push(`lint: ${issues.length > 0 ? issues.join(", ") : "healthy"}`);
  if (coreUnlogged > 0) {
    lines.push(`unlogged: ${coreUnlogged} change(s) -- consider wiki/log.md`);
  }

  if (projects.length > 0) {
    lines.push(`projects: ${projects.map((p) => p.name).join(", ")}`);
  }

  if (projectRoot) {
    const projName = projects.find((p) => path.resolve(p.dir) === path.resolve(projectRoot))?.name;
    if (projName) {
      const info = loadProjectInfo(coreRoot, projName);
      if (info) {
        lines.push("");
        lines.push(`active: ${projName}`);
        if (info.architecture) {
          for (const layer of info.architecture.layers) {
            const fileCount = layer.files.split(",").length;
            lines.push(`  ${layer.layer}: ${fileCount} files`);
          }
        }
        if (info.conventions.length > 0) {
          lines.push(`  conventions: ${info.conventions.length} rules`);
        }
        lines.push(`  roadmap: ${info.roadmap.tasks.length} tasks, ${info.roadmap.research.length} research`);

        const projBrief = getWikiBrief(coreRoot, projName);
        lines.push(`  wiki: ${projBrief.stats.split(" | ")[0]} | recent: ${projBrief.recent}`);

        const hooks = loadHooks(coreRoot, projectRoot);
        const guardHooks = hooks.filter((h) => h.guard);
        const guardContext = {
          projectLoaded: true,
          hasLogEntry: coreUnlogged === 0,
          hasGitDiff: getGitStatus(projectRoot || coreRoot).uncommitted > 0,
        };
        const guardResults = guardHooks.map((h) => ({
          name: h.name,
          result: evaluateGuard(h.guard, guardContext),
        }));
        const guardFails = guardResults.filter((g) => !g.result.pass);
        lines.push(`  guards: ${guardFails.length > 0 ? guardFails.map((g) => g.name + " FAIL").join(", ") : "all pass"}`);
      }
    }
  }

  lines.push("");
  lines.push("behavioural rules: wiki-first check, goal quality bar, validation gate, wiki writing guard");
  lines.push("see start.md for details");

  return lines.join("\n");
}

function cmdStatus(coreRoot, projectRoot) {
  if (!coreRoot) coreRoot = findCoreRoot(process.cwd());
  if (!coreRoot) return "error: CORE root not found";

  const lines = [];

  const coreGit = getGitStatus(coreRoot);
  lines.push(`CORE git: ${coreGit.uncommitted} uncommitted`);
  if (coreGit.details.length > 0) {
    for (const d of coreGit.details) lines.push(`  ${d}`);
  }

  const coreUnlogged = getWikiUnlogged(coreRoot);
  if (coreUnlogged > 0) {
    lines.push(`CORE unlogged: ${coreUnlogged} wiki change(s)`);
  }

  if (projectRoot) {
    const projGit = getGitStatus(projectRoot);
    lines.push(`project git: ${projGit.uncommitted} uncommitted`);
    if (projGit.details.length > 0) {
      for (const d of projGit.details) lines.push(`  ${d}`);
    }

    const projName = path.basename(projectRoot);
    const projUnlogged = getWikiUnlogged(coreRoot, projName);
    if (projUnlogged > 0) {
      lines.push(`project unlogged: ${projUnlogged} wiki change(s)`);
    }
  }

  return lines.join("\n");
}

module.exports = { cmdStart, cmdStatus, getGitStatus };
