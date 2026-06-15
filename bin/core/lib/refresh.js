const fs = require("fs");
const path = require("path");
const { findCoreRoot, resolveWikiRoot } = require("../../../wiki/bin/lib/public-api");
const { listProjects } = require("./projects");

const CORE_HOOK_NAMES = [
	"start",
	"end",
	"crystallize",
	"ingest",
	"lint",
	"refactor",
	"fix-ci",
	"research",
	"security-review",
	"tech-add",
	"integrate",
	"init-project",
];
const KEY_WIKI_DOCS = [
	"architecture",
	"code-conventions",
	"tech-stack",
	"llm-wiki-conventions",
	"wiki-cli",
	"guard-system",
];

function safeRead(p) {
	if (!p || !fs.existsSync(p)) return null;
	try {
		return fs.readFileSync(p, "utf-8");
	} catch {
		return null;
	}
}

function listSources(coreRoot, projectRoot) {
	const sources = [];
	for (const h of CORE_HOOK_NAMES) {
		sources.push({
			kind: "core-hook",
			name: h,
			rel: path.join(".agents", "hooks", `${h}.md`),
			abs: path.join(coreRoot, ".agents", "hooks", `${h}.md`),
			optional: false,
		});
	}
	sources.push({
		kind: "core-doc",
		name: "AGENTS.md",
		rel: "AGENTS.md",
		abs: path.join(coreRoot, "AGENTS.md"),
		optional: false,
	});
	if (projectRoot) {
		const projName = path.basename(projectRoot);
		sources.push({
			kind: "project-doc",
			name: "AGENTS.md",
			rel: path.join(projName, "AGENTS.md"),
			abs: path.join(projectRoot, "AGENTS.md"),
			optional: false,
		});
		sources.push({
			kind: "project-hook",
			name: "start",
			rel: path.join(projName, ".agents", "hooks", "start.md"),
			abs: path.join(projectRoot, ".agents", "hooks", "start.md"),
			optional: true,
		});
		sources.push({
			kind: "project-doc",
			name: "ROADMAP.md",
			rel: path.join(projName, "ROADMAP.md"),
			abs: path.join(projectRoot, "ROADMAP.md"),
			optional: true,
		});
	}
	for (const d of KEY_WIKI_DOCS) {
		sources.push({
			kind: "wiki-doc",
			name: d,
			rel: path.join("wiki", "concepts", `${d}.md`),
			abs: path.join(coreRoot, "wiki", "concepts", `${d}.md`),
			optional: true,
		});
	}
	return sources;
}

function extractSectionTitles(content) {
	if (!content) return [];
	const titles = [];
	for (const line of content.split(/\r?\n/)) {
		const m = line.match(/^#{1,3}\s+(.+?)\s*$/);
		if (m) titles.push(m[1].trim());
	}
	return titles;
}

function extractReadyTop3(projectDir) {
	const content = safeRead(path.join(projectDir, "ROADMAP.md"));
	if (!content) return [];
	const lines = content.split(/\r?\n/);
	const items = [];
	let inReady = false;
	for (const line of lines) {
		if (/^##\s+(?:Ready|Ready\s+candidates|GO)/i.test(line)) {
			inReady = true;
			continue;
		}
		if (inReady && /^##\s+/.test(line)) break;
		if (!inReady) continue;
		const taskMatch = line.match(/^\s*[-*]\s+(?:\*\*)?([^(:*|\n]+)/);
		if (taskMatch) {
			const t = taskMatch[1].trim();
			if (t && !t.startsWith("depends") && !t.startsWith("category")) {
				items.push(t);
			}
			if (items.length >= 3) break;
		}
	}
	return items;
}

function gatherRefresh(coreRoot, projectRoot) {
	const sources = listSources(coreRoot, projectRoot);
	const reloaded = [];
	const missing = [];
	const headingsByFile = {};
	for (const s of sources) {
		const content = safeRead(s.abs);
		if (content !== null) {
			reloaded.push({ ...s, exists: true });
			headingsByFile[s.rel] = extractSectionTitles(content);
		} else if (s.optional) {
			missing.push({ ...s, exists: false, reason: "optional" });
		} else {
			missing.push({ ...s, exists: false, reason: "required" });
		}
	}
	const ready = projectRoot ? extractReadyTop3(projectRoot) : [];
	return { sources: reloaded, missing, headingsByFile, ready };
}

function formatReport(data, opts) {
	if (opts.json) {
		const out = {
			activeProject: data.activeProject,
			sourcesReloaded: data.sources.map((s) => s.rel),
			missing: data.missing.map((m) => ({ rel: m.rel, reason: m.reason })),
			headingsByFile: data.headingsByFile,
			ready: data.ready,
		};
		return JSON.stringify(out, null, 2);
	}

	const lines = [];
	lines.push("## Context Refresh Report");
	lines.push(`- Active project: ${data.activeProject || "none (CORE mode)"}`);
	lines.push(`- Sources reloaded: ${data.sources.length} (${data.missing.length} missing/optional)`);
	if (data.ready.length > 0) {
		lines.push(`- Ready top-3: ${data.ready.join(" | ")}`);
	}
	lines.push("");
	lines.push("### Reload these sources (agent: read full content)");
	lines.push("```");
	for (const s of data.sources) lines.push(s.rel);
	lines.push("```");
	lines.push("");
	lines.push("### Key headings (constraints/preferences are inside)");
	const grouped = { "Core hooks": [], "Core docs": [], "Project files": [], "Wiki docs": [] };
	for (const s of data.sources) {
		const h = data.headingsByFile[s.rel] || [];
		const summary = h.slice(0, 8).join(" | ");
		if (s.kind === "core-hook") grouped["Core hooks"].push(`- ${s.rel}: ${summary}`);
		else if (s.kind === "core-doc") grouped["Core docs"].push(`- ${s.rel}: ${summary}`);
		else if (s.kind === "project-doc" || s.kind === "project-hook") grouped["Project files"].push(`- ${s.rel}: ${summary}`);
		else if (s.kind === "wiki-doc") grouped["Wiki docs"].push(`- ${s.rel}: ${summary}`);
	}
	for (const [group, items] of Object.entries(grouped)) {
		if (items.length === 0) continue;
		lines.push(`**${group}:**`);
		lines.push(...items);
		lines.push("");
	}
	if (data.missing.length > 0) {
		lines.push("### Missing/optional");
		for (const m of data.missing) lines.push(`- ${m.rel} (${m.reason})`);
	}
	return lines.join("\n");
}

function cmdRefresh(coreRoot, projectRoot, opts) {
	if (!coreRoot) coreRoot = findCoreRoot(process.cwd());
	if (!coreRoot) return "error: CORE root not found";
	const data = gatherRefresh(coreRoot, projectRoot);
	data.activeProject = projectRoot ? path.basename(projectRoot) : null;
	const report = formatReport(data, opts);
	if (opts.apply) {
		return `${report}\n\n---\n\n## REHYDRATED CONSTRAINTS (apply immediately)\n- Language: Russian (reasoning + output), English (technical terms)\n- Format: caveman full mode (drop articles, fragments OK)\n- Code style: no comments unless asked, no emoji, <4 lines unless detail\n- Commit policy: never commit unless explicitly asked\n- Wiki protocol: read free, write needs Wiki writing guard\n- Tool policy: edit/read/grep/glob, no proactive actions\n- Dev server up: ${process.env.REFRESH_DEV_URL || "localhost:5173"} (if relevant)\n- Active project: ${data.activeProject || "CORE mode"}\n`;
	}
	return report;
}

module.exports = {
	cmdRefresh,
	gatherRefresh,
	extractSectionTitles,
	extractReadyTop3,
	formatReport,
	listSources,
};
