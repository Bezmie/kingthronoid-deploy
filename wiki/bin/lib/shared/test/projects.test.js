const { discoverProjects } = require("../projects");
const assert = require("assert");

const projects = discoverProjects("nonexistent-root");
assert.strictEqual(projects.length, 0, "nonexistent root returns empty");

const coreRoot = require("path").resolve(__dirname, "../../../../..");
const realProjects = discoverProjects(coreRoot);
assert.ok(realProjects.length > 0, "CORE has projects");
const kt = realProjects.find((p) => p.name === "kingthronoid");
assert.ok(kt, "kingthronoid discovered");
assert.ok(kt.dir, "project has dir");

console.log("projects: all passed");
