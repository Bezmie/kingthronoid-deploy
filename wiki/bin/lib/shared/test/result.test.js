const { basename, pageToResult } = require("../result");
const assert = require("assert");

assert.strictEqual(basename("sources/my-file"), "my-file", "basename extracts last segment");
assert.strictEqual(basename("log"), "log", "basename of simple name = itself");
assert.strictEqual(basename("a/b/c"), "c", "basename of deep path");

const page = {
  pageName: "concepts/my-concept",
  meta: { type: "concept", tags: ["pattern", "architecture"], date: "2026-05-28" },
  title: "My Concept",
  summary: "A test concept summary",
};
const result = pageToResult(page);
assert.strictEqual(result.name, "concepts/my-concept", "pageToResult name");
assert.strictEqual(result.type, "concept", "pageToResult type");
assert.strictEqual(result.tags.length, 2, "pageToResult tags");
assert.strictEqual(result.title, "My Concept", "pageToResult title");
assert.strictEqual(result.summary, "A test concept summary", "pageToResult summary");
assert.strictEqual(result.score, undefined, "no extra without extra arg");

const withScore = pageToResult(page, { score: 1.5 });
assert.strictEqual(withScore.score, 1.5, "pageToResult with extra");

console.log("result: all passed");
