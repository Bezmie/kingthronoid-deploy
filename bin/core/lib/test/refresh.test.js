const path = require("path");
const fs = require("fs");
const assert = require("assert");
const {
	extractSectionTitles,
	extractReadyTop3,
	listSources,
	gatherRefresh,
	formatReport,
	cmdRefresh,
} = require("../refresh");

assert.deepStrictEqual(extractSectionTitles(null), [], "null content -> []");
assert.deepStrictEqual(extractSectionTitles(""), [], "empty -> []");
const sample = "# Title\n## 1. Start\nbody\n## 2. End\nbody\n### 2.1 Sub\nbody";
const titles = extractSectionTitles(sample);
assert.deepStrictEqual(titles, ["Title", "1. Start", "2. End", "2.1 Sub"], "all headings extracted");

const tmpDir = fs.mkdtempSync(path.join(require("os").tmpdir(), "refresh-test-"));
try {
	fs.writeFileSync(path.join(tmpDir, "ROADMAP.md"), `# Roadmap\n\n## Ready\n- **Task A** -- description (impact: high, effort: 1)\n- **Task B**: notes (impact: med)\n- Task C | notes\n- Task D\n\n## Backlog\n- X\n`);
	const ready = extractReadyTop3(tmpDir);
	assert.deepStrictEqual(ready, ["Task A", "Task B", "Task C"], "top 3 from ## Ready section");
} finally {
	fs.rmSync(tmpDir, { recursive: true, force: true });
}

const readyEmpty = extractReadyTop3(path.join(require("os").tmpdir(), "definitely-does-not-exist-" + Date.now()));
assert.deepStrictEqual(readyEmpty, [], "missing ROADMAP -> []");

const sources = listSources("C:/Users/bezmi/Desktop/CORE", null);
assert.ok(sources.length > 5, "sources list has entries");
assert.ok(sources.every((s) => s.rel && s.abs), "every source has rel+abs");
assert.ok(sources.some((s) => s.rel === "AGENTS.md" && !s.optional), "core AGENTS.md is required");
assert.ok(sources.some((s) => s.rel.includes("start.md")), "core start.md is listed");
assert.ok(sources.some((s) => s.kind === "wiki-doc" && s.optional), "wiki docs marked optional");

const sourcesProj = listSources("C:/Users/bezmi/Desktop/CORE", "C:/Users/bezmi/Desktop/CORE/kingthronoid");
assert.ok(sourcesProj.some((s) => s.rel === path.join("kingthronoid", "AGENTS.md")), "project AGENTS.md listed");
assert.ok(sourcesProj.some((s) => s.rel === path.join("kingthronoid", "ROADMAP.md") && s.optional), "project ROADMAP listed as optional");

const data = gatherRefresh("C:/Users/bezmi/Desktop/CORE", "C:/Users/bezmi/Desktop/CORE/kingthronoid");
assert.ok(data.sources.length > 0, "reloaded has entries");
assert.ok(data.sources.every((s) => s.exists), "all reloaded have exists=true");
assert.ok(data.headingsByFile["AGENTS.md"] && data.headingsByFile["AGENTS.md"].length > 0, "core AGENTS headings extracted");
assert.ok(data.headingsByFile[path.join("kingthronoid", "AGENTS.md")] && data.headingsByFile[path.join("kingthronoid", "AGENTS.md")].length > 0, "project AGENTS headings extracted");
assert.ok(Array.isArray(data.ready), "ready is array");
for (const m of data.missing) {
	assert.strictEqual(m.exists, false, `missing entry ${m.rel} exists=false`);
}

const dataCore = gatherRefresh("C:/Users/bezmi/Desktop/CORE", null);
assert.strictEqual(dataCore.ready.length, 0, "no ready in CORE-only mode");

const report = formatReport({
	...data,
	activeProject: "kingthronoid",
}, { json: false });
assert.ok(report.includes("Context Refresh Report"), "report has header");
assert.ok(report.includes("kingthronoid"), "report has active project");
assert.ok(report.includes("Sources reloaded"), "report has sources count");
assert.ok(report.includes("Ready top-3") || data.ready.length === 0, "report has ready top-3 or empty");
assert.ok(report.includes("Core hooks"), "report has Core hooks section");
assert.ok(report.includes("Project files"), "report has Project files section");
assert.ok(report.includes("Wiki docs"), "report has Wiki docs section");

const jsonOut = formatReport({
	...data,
	activeProject: "kingthronoid",
}, { json: true });
const parsed = JSON.parse(jsonOut);
assert.ok(Array.isArray(parsed.sourcesReloaded), "json has sourcesReloaded array");
assert.ok(parsed.headingsByFile, "json has headingsByFile");
assert.ok(parsed.activeProject === "kingthronoid", "json has activeProject");

const cmdOut = cmdRefresh("C:/Users/bezmi/Desktop/CORE", "C:/Users/bezmi/Desktop/CORE/kingthronoid", {});
assert.ok(cmdOut.includes("Context Refresh Report"), "cmd output has report");

const cmdApply = cmdRefresh("C:/Users/bezmi/Desktop/CORE", "C:/Users/bezmi/Desktop/CORE/kingthronoid", { apply: true });
assert.ok(cmdApply.includes("REHYDRATED CONSTRAINTS"), "--apply adds rehydrated block");
assert.ok(cmdApply.includes("Language: Russian"), "rehydrated block has language");
assert.ok(cmdApply.includes("caveman full mode"), "rehydrated block has format");
assert.ok(cmdApply.includes("never commit unless explicitly asked"), "rehydrated block has commit policy");

const cmdJson = cmdRefresh("C:/Users/bezmi/Desktop/CORE", "C:/Users/bezmi/Desktop/CORE/kingthronoid", { json: true });
const parsedCmd = JSON.parse(cmdJson);
assert.ok(parsedCmd.sourcesReloaded.length > 0, "json cmd has sources");

const cmdNoProj = cmdRefresh("C:/Users/bezmi/Desktop/CORE", null, {});
assert.ok(cmdNoProj.includes("none (CORE mode)"), "no project -> CORE mode message");

const badRoot = cmdRefresh(null, null, {});
assert.ok(badRoot === "error: CORE root not found" || badRoot.includes("Context Refresh Report"), "null core root handled");

console.log("refresh: all passed");
