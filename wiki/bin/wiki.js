const { loadOrBuild, loadAllWikis, findCoreRoot, resolveWikiRoot, findProjectWikis } = require("./lib/index");
const { cmdSearch, cmdContext, cmdTags, cmdLinks, cmdBrief, cmdList, cmdEdges } = require("./lib/search");
const { cmdOrphans, cmdBroken, cmdLint, cmdGaps, cmdCoverage, cmdBrokenEdges, cmdPromotion } = require("./lib/lint");
const { cmdLogLast, cmdLogStats, cmdLogSince, cmdDiff, cmdGraph } = require("./lib/analytics");
const { cmdIngestPrep, cmdSynthesis, cmdCrystallizePrep } = require("./lib/ingest");
const fmt = require("./lib/format");

const COMMANDS = [
  "brief", "search", "context", "tags", "links", "edges",
  "orphans", "broken", "list",
  "lint", "gaps", "coverage", "promotion-stats",
  "log", "diff", "graph",
  "ingest-prep", "synthesis", "crystallize-prep",
  "after-edit",
];

function parseArgs(argv) {
  const opts = { command: "", query: "", n: 10, tags: "", json: false, compact: false, since: "", root: "", all: false };
  const args = argv.slice(2);
  if (args.length === 0) {
    printHelp();
    process.exit(0);
  }
  opts.command = args[0];

  const rest = args.slice(1);
  const positional = [];
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--json") {
      opts.json = true;
    } else if (rest[i] === "--compact") {
      opts.compact = true;
    } else if (rest[i] === "-n" && rest[i + 1]) {
      opts.n = parseInt(rest[++i], 10);
    } else if (rest[i] === "--tags" && rest[i + 1]) {
      opts.tags = rest[++i];
    } else if (rest[i] === "--since" && rest[i + 1]) {
      opts.since = rest[++i];
    } else if (rest[i] === "--format" && rest[i + 1]) {
      opts.query = rest[++i];
    } else if (rest[i] === "--type" && rest[i + 1]) {
      opts.typeFilter = rest[++i];
    } else if (rest[i] === "--root" && rest[i + 1]) {
      opts.root = rest[++i];
    } else if (rest[i] === "--all") {
      opts.all = true;
    } else {
      positional.push(rest[i]);
    }
  }
  if (!opts.query) opts.query = positional.join(" ");
  return opts;
}

function printHelp() {
  console.log(`wiki -- structured data CLI for LLM-wiki

Usage: node wiki/bin/wiki.js <command> [args] [options]

Commands:
  brief                         Overview (~80 tokens)
  search <query>                BM25 fulltext search
  context <query>               BM25 + summary top-N (for LLM)
  tags <tag1,tag2>              Pages by tags (AND)
  links <page-name>             Incoming [[links]] to page
  edges <page-name>             Typed edges (1-hop) for page
  list                          All pages + summary
  list --type concept|entity|source|log  Filter by type
  orphans                       Pages with no incoming links
  broken                        Broken [[links]]
  lint                          Comprehensive health check
  gaps                          Mentioned but not created pages
  coverage                      raw->source coverage
  promotion-stats               Promotion candidates (source->entity, entity->concept)
  log last N                     Last N log entries
  log stats                      Log statistics
  log since YYYY-MM-DD           Entries since date
  diff [--since YYYY-MM-DD]     Unlogged changes
  graph [--format mermaid|dot]   Export link graph
  ingest-prep <raw-file>         Context before ingest
  synthesis <tag>                 Context for tag-based synthesis
  crystallize-prep [--since DATE] Context before crystallize (changed files, relevant pages, gaps)
  after-edit                      Post-edit check: lint + diff + log reminder

Options:
  --json             JSON output
  --compact          Minimal output (for LLM context)
  -n N               Result limit (default: 10)
  --tags T1,T2       Filter by tags (AND, for search/context)
  --since YYYY-MM-DD Date filter (for diff)
  --format FORMAT    Output format (for graph: mermaid|dot)
  --root NAME        Wiki root: core, project name, or path (auto-detect if omitted)
  --all              Search across all wikis (core + project wikis)`);
}

function getWikiDir(opts) {
  if (opts.all) return null;
  return resolveWikiRoot(undefined, opts.root || undefined);
}

function loadCoreIndex() {
  const coreRoot = findCoreRoot();
  if (!coreRoot) return null;
  return loadOrBuild(require("path").join(coreRoot, "wiki"));
}

function loadProjectIndexes(coreRoot) {
  if (!coreRoot) return null;
  const projects = findProjectWikis(coreRoot);
  if (projects.length === 0) return null;
  return projects.map((p) => ({ projectName: p.name, ...loadOrBuild(p.wikiDir) }));
}

function searchAllWikis(query, opts) {
  const coreRoot = findCoreRoot();
  const wikis = loadAllWikis(coreRoot);
  const allResults = [];
  for (const w of wikis) {
    const results = cmdSearch(query, w.index, opts);
    for (const r of results) {
      r.wiki = w.name;
      allResults.push(r);
    }
  }
  allResults.sort((a, b) => b.score - a.score);
  return allResults.slice(0, opts.n || 10);
}

function main() {
  const opts = parseArgs(process.argv);

  if (opts.all) {
    switch (opts.command) {
      case "search":
      case "context": {
        if (!opts.query) {
          console.error("Usage: node wiki/bin/wiki.js context <query> --all");
          process.exit(1);
        }
        fmt.outputAll(searchAllWikis(opts.query, opts), opts);
        break;
      }
      case "brief": {
        const coreRoot = findCoreRoot();
        const wikis = loadAllWikis(coreRoot);
        for (const w of wikis) {
          const brief = cmdBrief(w.index);
          console.log(`[${w.name}] ${brief.stats} | Top: ${brief.topTags} | Recent: ${brief.recent}`);
        }
        break;
      }
      case "list": {
        const coreRoot = findCoreRoot();
        const wikis = loadAllWikis(coreRoot);
        for (const w of wikis) {
          const listOpts = { ...opts, n: undefined };
          const pages = cmdList(w.index, listOpts);
          for (const p of pages) {
            p.wiki = w.name;
            if (opts.compact) {
              console.log(`${w.name}/${p.name} [${p.type || "?"}] -- ${p.title}`);
            } else {
              console.log(`[${p.type || "?"}] (${w.name}) ${p.name} -- ${p.title}`);
            }
          }
        }
        break;
      }
      default:
        console.error(`--all not supported for ${opts.command}. Use without --all for single-wiki operations.`);
        process.exit(1);
    }
    return;
  }

  const wikiDir = getWikiDir(opts);
  const index = loadOrBuild(wikiDir);
  const coreIndex = (wikiDir !== index.wikiDir) ? loadCoreIndex() : null;
  const coreRoot = findCoreRoot();
  const projectIndexes = (coreRoot && wikiDir === index.wikiDir)
    ? loadProjectIndexes(coreRoot)
    : null;

  switch (opts.command) {
    case "search": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js search <query>");
        process.exit(1);
      }
      fmt.output(cmdSearch(opts.query, index, opts), opts);
      break;
    }
    case "context": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js context <query>");
        process.exit(1);
      }
      fmt.outputContext(cmdContext(opts.query, index, opts), opts);
      break;
    }
    case "tags": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js tags <tag1,tag2>");
        process.exit(1);
      }
      fmt.output(cmdTags(opts.query, index), opts);
      break;
    }
    case "links": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js links <page-name>");
        process.exit(1);
      }
      fmt.output(cmdLinks(opts.query, index), opts);
      break;
    }
    case "edges": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js edges <page-name>");
        process.exit(1);
      }
      fmt.outputEdges(cmdEdges(opts.query, index, opts), opts);
      break;
    }
    case "orphans": {
      fmt.output(cmdOrphans(index), opts);
      break;
    }
    case "broken": {
      fmt.output(cmdBroken(index, coreIndex, projectIndexes), opts);
      break;
    }
    case "lint": {
      const lintReport = cmdLint(index, coreIndex, projectIndexes);
      fmt.outputLint(lintReport, opts);
      if (lintReport.broken.count > 0) process.exit(1);
      break;
    }
    case "gaps": {
      fmt.outputGaps(cmdGaps(index), opts);
      break;
    }
    case "coverage": {
      fmt.outputCoverage(cmdCoverage(index), opts);
      break;
    }
    case "promotion-stats": {
      fmt.outputPromotion(cmdPromotion(index), opts);
      break;
    }
    case "log": {
      const subcmd = opts.query || "";
      const wd = index.wikiDir;
      if (subcmd.startsWith("last")) {
        const n = parseInt(opts.query.split(" ")[1], 10) || 5;
        fmt.outputLog(cmdLogLast(n, wd), opts);
      } else if (subcmd.startsWith("stats")) {
        fmt.outputLogStats(cmdLogStats(wd), opts);
      } else if (subcmd.startsWith("since")) {
        const date = opts.query.split(" ")[1] || "";
        if (!date) {
          console.error("Usage: node wiki/bin/wiki.js log since YYYY-MM-DD");
          process.exit(1);
        }
        fmt.outputLog(cmdLogSince(date, wd), opts);
      } else {
        console.error("Usage: node wiki/bin/wiki.js log <last N | stats | since YYYY-MM-DD>");
        process.exit(1);
      }
      break;
    }
    case "diff": {
      fmt.outputDiff(cmdDiff(opts, index.wikiDir), opts);
      break;
    }
    case "graph": {
      const format = opts.query || "mermaid";
      console.log(cmdGraph(index, format));
      break;
    }
    case "ingest-prep": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js ingest-prep <raw-file-name>");
        process.exit(1);
      }
      fmt.outputIngestPrep(cmdIngestPrep(opts.query, index), opts);
      break;
    }
    case "synthesis": {
      if (!opts.query) {
        console.error("Usage: node wiki/bin/wiki.js synthesis <tag>");
        process.exit(1);
      }
      fmt.outputSynthesis(cmdSynthesis(opts.query, index), opts);
      break;
    }
    case "crystallize-prep": {
      fmt.outputCrystallizePrep(cmdCrystallizePrep(index, opts), opts);
      break;
    }
    case "list": {
      const listOpts = { ...opts, n: undefined };
      fmt.output(cmdList(index, listOpts), opts);
      break;
    }
    case "brief": {
      fmt.outputBrief(cmdBrief(index), opts);
      break;
    }
    case "help":
    case "--help":
    case "-h": {
      printHelp();
      break;
    }
    case "after-edit": {
      const lintReport = cmdLint(index, coreIndex, projectIndexes);
      const diffResult = cmdDiff(opts, index.wikiDir);
      fmt.outputAfterEdit(lintReport, diffResult);
      if (lintReport.broken.count > 0) process.exit(1);
      break;
    }
    default:
      console.error(`Unknown command: ${opts.command}`);
      console.error(`Commands: ${COMMANDS.join(", ")}`);
      process.exit(1);
  }
}

main();
