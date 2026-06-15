const { computeIdf, bm25Score, computeTermFreq, K1, B } = require("../bm25");
const assert = require("assert");

assert.strictEqual(K1, 1.2);
assert.strictEqual(B, 0.75);

assert.ok(computeIdf(1, 100) > 0, "IDF positive");
assert.ok(computeIdf(100, 100) > 0, "IDF still positive even when term in all docs (BM25+ variant)");
assert.ok(computeIdf(1, 100) > computeIdf(100, 100), "IDF higher for rare term");
assert.ok(Math.abs(computeIdf(1, 100) - Math.log((100 - 1 + 0.5) / (1 + 0.5) + 1)) < 0.001, "IDF formula correct");

const tf = computeTermFreq(["hello", "world", "hello"]);
assert.deepStrictEqual(tf, { hello: 2, world: 1 });

const avgDl = 10;
const idf = computeIdf(1, 100);
const score = bm25Score(2, 5, avgDl, idf);
assert.ok(score > 0, "BM25 score positive");
assert.ok(typeof score === "number");

const scoreZeroTf = bm25Score(0, 5, avgDl, idf);
assert.strictEqual(scoreZeroTf, 0, "BM25 zero when tf=0");

console.log("bm25: all passed");
