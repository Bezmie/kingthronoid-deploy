const { parseMarkdownTable } = require("../markdown-table");
const assert = require("assert");

const table = `| Layer | Files |
|-------|-------|
| Core | compute.ts, state.ts |
| Systems | core.ts, cells.ts |
`;

const rows = parseMarkdownTable(table, ["layer", "files"]);
assert.strictEqual(rows.length, 2);
assert.strictEqual(rows[0].layer, "Core");
assert.strictEqual(rows[0].files, "compute.ts, state.ts");
assert.strictEqual(rows[1].layer, "Systems");

const noTable = "Just text\nNo table here";
const empty = parseMarkdownTable(noTable, ["a", "b"]);
assert.strictEqual(empty.length, 0);

const noCols = parseMarkdownTable(table);
assert.strictEqual(noCols.length, 2);
assert.ok(Array.isArray(noCols[0]));

console.log("markdown-table: all passed");
