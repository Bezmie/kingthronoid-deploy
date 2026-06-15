const { findCoreRoot, resolveWikiRoot } = require("../wiki/bin/lib/public-api");
const { route, evaluateGuard, formatRouteResult, PROJECT_ALIASES } = require("./core/lib/route");
const { loadHooks, formatHooksTable } = require("./core/lib/hooks");
const { listProjects, loadProjectInfo, formatProjectInfo } = require("./core/lib/projects");
const { cmdStart, cmdStatus } = require("./core/lib/status");
const { cmdLog } = require("./core/lib/log");
const { cmdRefresh } = require("./core/lib/refresh");
const path = require("path");
const fs = require("fs");

const SESSION_FILE = ".core-session.json";

function readSession(coreRoot) {
  const p = path.join(coreRoot, SESSION_FILE);
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return null; }
}

function writeSession(coreRoot, projectName) {
  const p = path.join(coreRoot, SESSION_FILE);
  if (projectName) {
    fs.writeFileSync(p, JSON.stringify({ activeProject: projectName }, null, 2), "utf-8");
  } else {
    try { fs.unlinkSync(p); } catch {}
  }
}

const COMMANDS = [
  "start", "status", "route", "hooks", "guard", "log", "refresh",
];

function printHelp() {
  console.log(`core -- agent orchestration CLI

Usage: node bin/core.js <command> [args] [options]

Commands:
  start [--root <project>]        Session start: wiki health, projects, active project context
  status [--root <project>]       Current state: git status, unlogged changes
  route <message>                 Match message to hook (signal-based routing)
  hooks [--root <project>]        List all available hooks and their signals
  guard <hook-name>               Evaluate guard condition for a hook
  log <type> [description]        Write structured entry to wiki/log.md
                                    --key value pairs for body fields
  refresh [--root <project>]      Rehydrate session context: list + summarize
                                    system/project bootstrap sources
                                    --apply                     append ## REHYDRATED
                                                              CONSTRAINTS block
                                    --json                      machine-readable output

Options:
  --root <name>                   Target project (name or path)
  --help                          Show this help
`);
}

function parseArgs(argv) {
  const opts = { command: "", args: [], root: "", kv: {} };
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") { printHelp(); process.exit(0); }

  opts.command = args[0];
  let i = 1;
  while (i < args.length) {
    if (args[i] === "--root" && args[i + 1]) {
      opts.root = args[i + 1];
      i += 2;
    } else if (args[i] === "--help" || args[i] === "-h") {
      printHelp();
      process.exit(0);
    } else if (args[i] === "--" && args[i + 1]) {
      const k = args[i + 1];
      const v = args[i + 2] || "";
      opts.kv[k] = v;
      i += 3;
    } else if (args[i].startsWith("--")) {
      const k = args[i].slice(2);
      const v = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : "";
      opts.kv[k] = v;
      if (v) i += 2; else i += 1;
    } else {
      opts.args.push(args[i]);
      i += 1;
    }
  }

  return opts;
}

function resolveProjectRoot(coreRoot, rootFlag) {
  const name = rootFlag || readSession(coreRoot)?.activeProject;
  if (!name || name === "core" || name === ".") return null;
  const resolved = PROJECT_ALIASES[name] || name;
  const projDir = path.join(coreRoot, resolved);
  if (fs.existsSync(projDir)) return projDir;
  return null;
}

function main() {
  const opts = parseArgs(process.argv);
  const coreRoot = findCoreRoot(process.cwd());
  if (!coreRoot && opts.command !== "help") {
    console.error("error: CORE root not found (no wiki/bin/wiki.js in parent dirs)");
    process.exit(1);
  }

  const projectRoot = resolveProjectRoot(coreRoot, opts.root);

  switch (opts.command) {
    case "start": {
      const startProjRoot = opts.root ? resolveProjectRoot(coreRoot, opts.root) : null;
      const output = cmdStart(coreRoot, startProjRoot);
      if (opts.root && startProjRoot) {
        writeSession(coreRoot, path.basename(startProjRoot));
      } else {
        writeSession(coreRoot, null);
      }
      console.log(output);
      break;
    }

    case "status": {
      const output = cmdStatus(coreRoot, projectRoot);
      console.log(output);
      break;
    }

    case "route": {
      if (opts.args.length === 0) {
        console.error("usage: core route <message>");
        process.exit(1);
      }
      const message = opts.args.join(" ");
      const result = route(message, coreRoot, projectRoot);
      console.log(formatRouteResult(result));
      break;
    }

    case "hooks": {
      const hooks = loadHooks(coreRoot, projectRoot);
      if ("json" in opts.kv) {
        console.log(JSON.stringify(hooks.map((h) => ({
          name: h.name,
          source: h.source,
          intent: h.intent,
          signals: h.signals,
          guard: h.guard,
        })), null, 2));
      } else {
        console.log(formatHooksTable(hooks));
      }
      break;
    }

    case "guard": {
      if (opts.args.length === 0) {
        console.error("usage: core guard <hook-name>");
        process.exit(1);
      }
      const hookName = opts.args[0];
      const hooks = loadHooks(coreRoot, projectRoot);
      const hook = hooks.find((h) => h.name === hookName);
      if (!hook) {
        console.log(`guard: unknown hook "${hookName}"`);
        process.exit(1);
      }
      const context = { projectLoaded: !!projectRoot };
      const result = evaluateGuard(hook.guard, context);
      if (result.pass) {
        console.log(`guard: pass`);
        if (result.needsLint) console.log(`note: ${result.note}`);
      } else {
        console.log(`guard: fail`);
        console.log(`fix: ${result.remediation}`);
        process.exit(1);
      }
      break;
    }

    case "log": {
      if (opts.args.length === 0 || !opts.args[0]) {
        console.error("usage: core log <type> [description] [--key value...]");
        process.exit(1);
      }
      const type = opts.args[0];
      const description = opts.args.slice(1).join(" ") || "";
      const projName = projectRoot ? path.basename(projectRoot) : null;
      const result = cmdLog(type, description, {
        coreRoot,
        root: opts.root || projName || null,
        kv: opts.kv,
      });
      console.log(result);
      break;
    }

    case "refresh": {
      const refreshOpts = {
        json: "json" in opts.kv,
        apply: "apply" in opts.kv,
      };
      const output = cmdRefresh(coreRoot, projectRoot, refreshOpts);
      console.log(output);
      break;
    }

    default:
      console.error(`unknown command: ${opts.command}`);
      printHelp();
      process.exit(1);
  }
}

main();
