const { basename } = require("./shared/result");
const TYPE_ABBR = { concept: "c", entity: "e", source: "s", tech: "t", project: "p" };

function formatOutput(data, opts, textFormatter) {
  if (opts.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  textFormatter(data, opts);
}

function compactResult(page) {
  return {
    name: page.name || page.pageName,
    type: page.type || page.meta?.type || "?",
    tags: page.tags || page.meta?.tags,
    date: page.date || page.meta?.date,
    title: page.title,
    score: page.score !== undefined ? +page.score.toFixed(2) : undefined,
    summary: page.summary,
  };
}

function formatResult(page, score) {
  const type = page.type || page.meta?.type || "?";
  const name = page.name || page.pageName || page.rel;
  const title = page.title || name;
  const typeTag = type !== "?" ? `[${type}]` : "";
  const scoreStr = score !== undefined ? ` (score: ${score.toFixed(2)})` : "";
  return `${typeTag} ${name} — ${title}${scoreStr}`;
}

function output(data, opts) {
  if (opts.json) {
    const compact = Array.isArray(data)
      ? data.map((item) => {
          if (item.name && item.summary !== undefined) {
            return { name: item.name, type: item.type || "?", tags: item.tags, date: item.date, title: item.title, summary: item.summary, sources: item.sources, score: item.score !== undefined ? +item.score.toFixed(2) : undefined };
          }
          if (item.from && item.target) return { from: item.from, target: item.target };
          return item;
        })
      : data;
    console.log(JSON.stringify(compact, null, 2));
    return;
  }
  if (opts.compact) {
    if (Array.isArray(data)) {
      data.forEach((item, i) => {
        if (item.score !== undefined) {
          const t = TYPE_ABBR[item.type || item.meta?.type] || "?";
          const name = item.name || item.pageName;
          console.log(`${i + 1}. ${name} [${t}] ${item.score.toFixed(2)} — ${item.summary}`);
        } else if (item.from && item.target) {
          console.log(`[[${item.target}]] ← [[${item.from}]]`);
        } else if (item.name) {
          console.log(`${item.name} [${item.type || "?"}] — ${item.title || item.summary || ""}`);
        } else {
          console.log(`${i + 1}. ${formatResult(item)}`);
        }
      });
    } else {
      console.log(JSON.stringify(data));
    }
    return;
  }
  if (Array.isArray(data)) {
    data.forEach((item, i) => {
      if (item.score !== undefined) {
        console.log(`${i + 1}. ${formatResult(item, item.score)}`);
      } else if (item.from && item.target) {
        console.log(`[[${item.target}]] ← referenced from [[${item.from}]]`);
      } else if (item.name) {
        const tags = item.tags && item.tags.length > 0 ? ` [${item.tags.join(",")}]` : "";
        console.log(`[${item.type || "?"}] ${item.name}${tags} — ${item.title}`);
      } else {
        console.log(`${i + 1}. ${formatResult(item)}`);
      }
    });
  }
}

function outputContext(results, opts) {
  output(results, opts);
}

function outputLint(report, opts) {
  formatOutput(report, opts, () => {
    const lines = [
      `Lint report:`,
      `  orphans:    ${report.orphans.count}`,
      `  broken:     ${report.broken.count}`,
      `  brokenEdges:${report.brokenEdges.count}`,
      `  lowXref:    ${report.lowXref.count} (pages with 0 incoming links)`,
      `  tagVariants:${report.tagVariants.count}`,
      `  stale:      ${report.stale.count} (>30 days)`,
      `  uncovered:  ${report.uncovered.count} (raw without source)`,
      `  unlinkedSources: ${report.unlinkedSources.count} (informational)`,
    ];
    if (report.conventions) {
      const c = report.conventions;
      lines.push(
        `  nonEnglishTitles: ${c.nonEnglishTitles.count}`,
        `  nonEnglishHeaders: ${c.nonEnglishHeaders.count}`,
        `  pathPrefixLinks: ${c.pathPrefixLinks.count}`,
        `  overlinked: ${c.overlinked.count} (Related >3 links)`,
        `  emptySources: ${c.emptySources.count}`,
        `  missingTags: ${c.missingTags.count}`,
        `  untyped: ${c.untyped.count} (no typed edges, informational)`,
        `  logWikiLinks: ${c.logWikiLinks.count} (use plain text in log.md, not [[]])`,
      );
    }
    console.log(lines.join("\n"));

    if (report.orphans.count > 0 && !opts.compact) {
      console.log("\nOrphans:");
      report.orphans.items.forEach((p) => console.log(`  [${p.type || "?"}] ${p.name}`));
    }
    if (report.broken.count > 0 && !opts.compact) {
      console.log("\nBroken links:");
      report.broken.items.forEach((b) => console.log(`  [[${b.target}]] <- [[${b.from}]]`));
    }
    if (report.broken.crossWikiHints && report.broken.crossWikiHints.length > 0 && !opts.compact) {
      console.log("\nCross-wiki hints (fix with [[sys:...]]):");
      report.broken.crossWikiHints.forEach((h) => console.log(`  [[${h.target}]] <- [[${h.from}]] -> ${h.fix} (exists in ${h.project})`));
    }
    if (report.lowXref.count > 0 && !opts.compact) {
      console.log("\nLow cross-references (<2 incoming):");
      report.lowXref.items.forEach((p) => console.log(`  [${p.type || "?"}] ${p.name} (${p.incomingLinks} links)`));
    }
    if (report.tagVariants.count > 0 && !opts.compact) {
      console.log("\nTag variants (fix with canonical form):");
      report.tagVariants.items.forEach((g) => {
        if (g.fix) {
          console.log(`  ${g.variants.join(" / ")} -> use: ${g.canonical} (fix: ${g.fix.join(", ")})`);
        } else {
          console.log(`  ${g.join(" / ")}`);
        }
      });
    }
    if (report.stale.count > 0 && !opts.compact) {
      console.log("\nStale pages:");
      report.stale.items.forEach((p) => console.log(`  [${p.type || "?"}] ${p.name} (${p.date})`));
    }
    if (report.uncovered.count > 0 && !opts.compact) {
      console.log("\nUncovered raw files:");
      report.uncovered.items.forEach((f) => console.log(`  ${f}`));
    }
    if (report.unlinkedSources.count > 0 && !opts.compact) {
      console.log("\nUnlinked sources (informational, not a problem):");
      report.unlinkedSources.items.forEach((s) => console.log(`  ${s.name} -- ${s.title}`));
    }
    if (report.brokenEdges.count > 0 && !opts.compact) {
      console.log("\nBroken typed edges:");
      report.brokenEdges.items.forEach((b) => console.log(`  ${b.type}::[[${b.target}]] <- [[${b.from}]]`));
    }
    if (report.brokenEdges.nonCanonical && report.brokenEdges.nonCanonical.length > 0 && !opts.compact) {
      console.log("\nNon-canonical edge types (canonical: uses, caused, fixes, supersedes, contradicts, derived):");
      report.brokenEdges.nonCanonical.forEach((t) => console.log(`  ${t}`));
    }
    if (report.conventions && !opts.compact) {
      const c = report.conventions;
      if (c.nonEnglishTitles.count > 0) {
        console.log("\nNon-English page titles (# H1):");
        c.nonEnglishTitles.items.forEach((i) => console.log(`  [${i.page}] ${i.text}`));
      }
      if (c.nonEnglishHeaders.count > 0) {
        console.log("\nNon-English section headers (##, ###):");
        c.nonEnglishHeaders.items.forEach((i) => console.log(`  [${i.page}] ${"#".repeat(i.level)} ${i.text}`));
      }
      if (c.pathPrefixLinks.count > 0) {
        console.log("\nPath prefixes in wikilinks ([[sources/...]], [[entities/...]]):");
        c.pathPrefixLinks.items.forEach((i) => console.log(`  [${i.page}] [[${i.link}]]`));
      }
      if (c.overlinked.count > 0) {
        console.log("\nOverlinked Related sections (>3 links):");
        c.overlinked.items.forEach((i) => console.log(`  [${i.page}] ${i.count} links`));
      }
      if (c.emptySources.count > 0) {
        console.log("\nEmpty sources field (sources: []):");
        c.emptySources.items.forEach((p) => console.log(`  ${p}`));
      }
      if (c.missingTags.count > 0) {
        console.log("\nMissing tags field:");
        c.missingTags.items.forEach((p) => console.log(`  ${p}`));
      }
      if (c.untyped.count > 0) {
        console.log("\nUntyped pages (no typed edges, informational):");
        c.untyped.items.forEach((p) => console.log(`  ${p}`));
      }
      if (c.logWikiLinks.count > 0) {
        console.log("\nWiki links in log.md (use plain text references instead):");
        c.logWikiLinks.items.forEach((i) => console.log(`  ${i.count} link(s): ${i.links.join(", ")}`));
      }
    }
  });
}

function outputGaps(gaps, opts) {
  formatOutput(gaps, opts, () => {
    if (gaps.length === 0) {
      console.log("No gaps found.");
      return;
    }
    console.log(`Gaps: ${gaps.length} mentioned but not created\n`);
    gaps.forEach((g) => {
      if (opts.compact) {
        console.log(`[[${g.target}]] <- ${g.fromPages.join(", ")}`);
      } else {
        console.log(`[[${g.target}]] -- referenced from ${g.fromCount} page(s): ${g.fromPages.join(", ")}`);
      }
    });
  });
}

function outputCoverage(cov, opts) {
  formatOutput(cov, opts, () => {
    const pct = cov.total > 0 ? Math.round((cov.covered / cov.total) * 100) : 100;
    console.log(`Coverage: ${cov.covered}/${cov.total} raw -> source (${pct}%)`);
    if (cov.uncovered.length > 0 && !opts.compact) {
      console.log("\nUncovered:");
      cov.uncovered.forEach((f) => console.log(`  ${f}`));
    }
  });
}

function outputLog(entries, opts) {
  formatOutput(entries, opts, () => {
    if (entries.length === 0) {
      console.log("No entries found.");
      return;
    }
    entries.forEach((e) => {
      if (opts.compact) {
        console.log(`[${e.date}] ${e.type} | ${e.description}`);
      } else {
        console.log(`## [${e.date}] ${e.type} | ${e.description}`);
        if (e.body) console.log(e.body.slice(0, 200) + (e.body.length > 200 ? "..." : ""));
        console.log();
      }
    });
  });
}

function outputLogStats(stats, opts) {
  formatOutput(stats, opts, () => {
    console.log(`Total entries: ${stats.total}`);
    console.log(`Period: ${stats.period}`);
    const typeLine = Object.entries(stats.byType).map(([t, c]) => `${t}(${c})`).join(", ");
    console.log(`By type: ${typeLine}`);
    const dateLine = Object.entries(stats.byDate).sort((a, b) => a[0].localeCompare(b[0])).map(([d, c]) => `${d}(${c})`).join(", ");
    console.log(`By month: ${dateLine}`);
  });
}

function outputDiff(diffResult, opts) {
  formatOutput(diffResult, opts, () => {
    const since = diffResult.since;
    const lastLog = diffResult.lastLogDate;
    const changed = diffResult.changed;
    console.log(`Since: ${since} (last log entry: ${lastLog})`);
    console.log(`Changed files: ${changed.length}`);
    if (changed.length > 0 && !opts.compact) {
      changed.forEach((c) => console.log(`  ${c.file} (modified ${c.modified})`));
    }
  });
}

function outputIngestPrep(prep, opts) {
  formatOutput(prep, opts, () => {
    if (prep.error) {
      console.log(`Error: ${prep.error}`);
      return;
    }
  console.log(`Raw file: ${prep.rawFile}`);
  console.log(`Size: ${prep.size}, lines: ${prep.lines}`);
  console.log(`Key terms: ${prep.topTerms.join(", ")}`);
  console.log(`\nRelevant wiki pages (BM25 top-${prep.relevant.length}):`);
  prep.relevant.forEach((p, i) => {
    if (opts.compact) {
      console.log(`  ${i + 1}. ${basename(p.name)} [${p.type}] ${p.score} -- ${p.title}`);
    } else {
      console.log(`  ${i + 1}. [${p.type}] ${p.name} (score: ${p.score}) -- ${p.title}`);
    }
  });
  if (prep.overlappingTags && prep.overlappingTags.length > 0) {
    console.log(`\nOverlapping tags: ${prep.overlappingTags.join(", ")}`);
    if (prep.tagPages && !opts.compact) {
      for (const [tag, pages] of Object.entries(prep.tagPages)) {
        console.log(`  ${tag}: ${pages.join(", ")}`);
      }
    }
  }
  console.log(`\nCovered: ${prep.covered ? "yes" : "no (no source page yet)"}`);
  console.log(`Recommend update: ${prep.recommend.join(", ")}`);
  });
}

function outputSynthesis(synth, opts) {
  formatOutput(synth, opts, () => {
  console.log(`Tag: ${synth.tag}`);

  console.log(`\nPages with tag (${synth.tagPages.length}):`);
  synth.tagPages.forEach((p) => {
    console.log(`  [${p.type || "?"}] ${p.name} [${p.tags.join(",")}] -- ${p.title}`);
  });

  if (synth.relatedTags.length > 0) {
    console.log(`\nRelated tags: ${synth.relatedTags.join(", ")}`);
  }

  console.log(`\nRelated concepts (${synth.relatedConcepts.length}):`);
  synth.relatedConcepts.forEach((p) => {
    console.log(`  [${p.type || "?"}] ${p.name} [${p.tags.join(",")}] -- ${p.title}`);
  });

  console.log(`\nSources (${synth.sources.length}):`);
  synth.sources.forEach((s) => {
    console.log(`  ${s.name}${s.title ? " -- " + s.title : ""}`);
  });

  if (synth.contradictions.length > 0) {
    console.log(`\nContradictions (${synth.contradictions.length}):`);
    synth.contradictions.forEach((c) => {
      console.log(`  WARNING ${c.page}: ${c.line.slice(0, 80)}`);
    });
  }

  if (synth.linkedButNotTag && synth.linkedButNotTag.length > 0) {
    console.log(`\nLinked but not in tag group (${synth.linkedButNotTag.length}):`);
    synth.linkedButNotTag.forEach((l) => {
      console.log(`  [[${l.target}]] <- ${l.from}`);
    });
  }
  });
}

function outputAll(results, opts) {
  formatOutput(results, opts, () => {
  for (const r of results) {
    const wikiTag = r.wiki ? `(${r.wiki}) ` : "";
    if (opts.compact) {
      console.log(`${r.wiki || "?"}/${r.name} [${r.type || "?"}] ${r.score.toFixed(2)} -- ${r.summary}`);
    } else {
      const score = r.score !== undefined ? ` (score: ${r.score.toFixed(2)})` : "";
      console.log(`[${r.type || "?"}] ${wikiTag}${r.name}${score} -- ${r.title}`);
    }
  }
  });
}

function outputCrystallizePrep(prep, opts) {
  formatOutput(prep, opts, () => {
  console.log(`Since: ${prep.since} (last log: ${prep.lastLogDate})`);
  console.log(`Changed files: ${prep.changedFiles}`);
  if (prep.changed.length > 0) {
    prep.changed.forEach((f) => console.log(`  ${f}`));
  }
  if (prep.relevantPages.length > 0) {
    console.log(`\nRelevant wiki pages:`);
    prep.relevantPages.forEach((p) => console.log(`  [${p.type || "?"}] ${p.name} -- ${p.title}`));
  }
  if (prep.gaps.length > 0) {
    console.log(`\nGaps that could be filled:`);
    prep.gaps.forEach((g) => console.log(`  [[${g.target}]] (${g.fromCount} references)`));
  }
  });
}

function outputPromotion(result, opts) {
  formatOutput(result, opts, () => {
    console.log(`Promotion candidates (threshold: ${result.threshold} sources/links): ${result.count}`);
    if (result.candidates.length === 0) {
      console.log("No candidates.");
      return;
    }
    for (const c of result.candidates) {
      const detail = c.sources ? `${c.sources} sources` : `${c.incomingLinks} incoming links`;
      console.log(`  [${c.type}] ${c.name} -> ${c.suggestedType} (${detail}) -- ${c.title}`);
      if (c.sourceList && !opts.compact) {
        console.log(`    sources: ${c.sourceList.join(", ")}`);
      }
    }
  });
}

function outputEdges(result, opts) {
  formatOutput(result, opts, () => {
    if (result.error) {
      console.log(`Error: ${result.error}`);
      return;
  }
  console.log(`Page: ${result.page}`);
  if (result.outgoing.length > 0) {
    console.log(`\nOutgoing edges:`);
    for (const e of result.outgoing) {
      const canon = e.canonical ? "" : " (non-canonical)";
      const res = e.resolved ? "" : " [BROKEN]";
      console.log(`  ${e.type}::[[${e.target}]]${canon}${res}`);
    }
  } else {
    console.log(`\nOutgoing edges: none`);
  }
  if (result.incoming.length > 0) {
    console.log(`\nIncoming edges:`);
    for (const e of result.incoming) {
      const canon = e.canonical ? "" : " (non-canonical)";
      console.log(`  ${e.type}:: from [[${e.from}]] (${e.fromTitle})${canon}`);
    }
  } else {
    console.log(`\nIncoming edges: none`);
  }
  if (result.edgeTypes && result.edgeTypes.length > 0) {
    console.log(`\nEdge types used: ${result.edgeTypes.join(", ")}`);
  }
  if (result.nonCanonical) {
    console.log(`Non-canonical types: ${result.nonCanonical.join(", ")} (canonical: uses, caused, fixes, supersedes, contradicts, derived)`);
  }
  });
}

function outputBrief(brief, opts) {
  formatOutput(brief, opts, () => {
    if (opts.compact) {
      console.log(brief.stats);
      console.log(brief.topTags);
      console.log(brief.recent);
    } else {
      console.log(brief.stats);
      console.log(`Top tags: ${brief.topTags}`);
      console.log(`Recent: ${brief.recent}`);
    }
  });
}

function outputAfterEdit(lintReport, diffResult) {
  outputLint(lintReport, { compact: true });
  const diffCount = diffResult.changed.length;
  console.log(`Unlogged changes: ${diffCount} file(s) since ${diffResult.since}`);
  if (diffCount > 0) {
    diffResult.changed.slice(0, 5).forEach((c) => console.log(`  ${c.file}`));
    if (diffCount > 5) console.log(`  ...+${diffCount - 5} more`);
    console.log("-> Update log.md before commit");
  }
}

module.exports = {
  compactResult,
  formatResult,
  output,
  outputContext,
  outputLint,
  outputGaps,
  outputCoverage,
  outputLog,
  outputLogStats,
  outputDiff,
  outputIngestPrep,
  outputSynthesis,
  outputAll,
  outputCrystallizePrep,
  outputPromotion,
  outputEdges,
  outputBrief,
  outputAfterEdit,
};
