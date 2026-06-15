const {
  extractFrontmatterBlock,
  parseFields,
  extractLinks,
  extractHeadings,
  parseWikiFrontmatter,
  parseHookFrontmatter,
} = require("../frontmatter");
const assert = require("assert");

const wikiContent = `---
type: concept
tags: [architecture, ecs, game-pattern]
date: 2026-05-01
sources: [game-programming-patterns, observer-pattern]
---

# ECS-Lite

Some text with [[observer-pattern]] and [[sys:kingthronoid/tech-stack]].

uses::[[component-pattern]]
`;

const result = parseWikiFrontmatter(wikiContent);
assert.strictEqual(result.meta.type, "concept");
assert.deepStrictEqual(result.meta.tags, ["architecture", "ecs", "game-pattern"]);
assert.strictEqual(result.meta.date, "2026-05-01");
assert.deepStrictEqual(result.meta.sources, ["game-programming-patterns", "observer-pattern"]);
assert.ok(result.links.includes("observer-pattern"));
assert.ok(result.sysLinks.includes("kingthronoid/tech-stack"));
assert.strictEqual(result.edges.length, 1);
assert.strictEqual(result.edges[0].type, "uses");
assert.strictEqual(result.edges[0].target, "component-pattern");
assert.ok(result.headings.length > 0);
assert.strictEqual(result.headings[0].text, "ECS-Lite");

const noFm = parseWikiFrontmatter("Just text no frontmatter");
assert.strictEqual(noFm.meta.type, "");
assert.deepStrictEqual(noFm.meta.tags, []);

const hookContent = `---
intent: Refactor the wiki
signals: [refactor, clean, organize]
guard: suggest-lint
---

# refactor
`;

const hookResult = parseHookFrontmatter(hookContent);
assert.strictEqual(hookResult.intent, "Refactor the wiki");
assert.deepStrictEqual(hookResult.signals, ["refactor", "clean", "organize"]);
assert.strictEqual(hookResult.guard, "suggest-lint");

const noHookFm = parseHookFrontmatter("No frontmatter here");
assert.strictEqual(noHookFm, null);

const block = extractFrontmatterBlock("---\ntype: test\n---\nBody");
assert.ok(block);
assert.strictEqual(block.fm, "type: test");

const codeContent = "Text with `[[not-a-link]]` and [[real-link]]";
const links = extractLinks(codeContent);
assert.deepStrictEqual(links.links, ["real-link"]);
assert.strictEqual(links.links.length, 1);

console.log("frontmatter: all passed");
