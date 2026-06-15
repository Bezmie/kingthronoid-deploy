const { cmdLog } = require("../log");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const coreRoot = path.resolve(__dirname, "../../../..");
const wikiDir = path.join(coreRoot, "wiki");
if (!fs.existsSync(wikiDir)) {
  console.log("log: skipped (no wiki dir)");
  process.exit(0);
}

const logPath = path.join(wikiDir, "log.md");
const originalContent = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf-8") : null;

const result1 = cmdLog("test", "unit test entry", { coreRoot, root: null, kv: {} });
assert.ok(result1.includes("test"), "log entry type in result");

const content1 = fs.readFileSync(logPath, "utf-8");
assert.ok(content1.includes("unit test entry"), "test entry visible in log");

const result2 = cmdLog("test", "second entry", { coreRoot, root: null, kv: { testKey: "testVal" } });
const content2 = fs.readFileSync(logPath, "utf-8");
assert.ok(content2.includes("testKey: testVal"), "kv pair in log");

if (originalContent !== null) {
  fs.writeFileSync(logPath, originalContent, "utf-8");
} else {
  fs.unlinkSync(logPath);
}

console.log("log: all passed");
