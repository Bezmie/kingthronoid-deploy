const { tokenize } = require("../tokenize");
const assert = require("assert");

assert.deepStrictEqual(tokenize("Hello World"), ["hello", "world"]);
assert.deepStrictEqual(tokenize("hello-world"), ["hello", "world"]);
assert.deepStrictEqual(tokenize("a b cd"), ["cd"]);
assert.deepStrictEqual(tokenize(""), []);
assert.deepStrictEqual(tokenize("123 test"), ["123", "test"]);

assert.deepStrictEqual(
  tokenize("src/core/compute", { replaceSlashes: true }),
  ["src", "core", "compute"]
);

assert.deepStrictEqual(
  tokenize("src/core/compute"),
  ["src", "core", "compute"]
);

assert.deepStrictEqual(tokenize("src-core-compute"), ["src", "core", "compute"]);

assert.deepStrictEqual(tokenize("рефакторинг wiki"), ["рефакторинг", "wiki"]);

console.log("tokenize: all passed");
