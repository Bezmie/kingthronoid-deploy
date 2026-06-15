const index = require("./index");
const frontmatter = require("./shared/frontmatter");
const projects = require("./shared/projects");
const markdownTable = require("./shared/markdown-table");
const tokenize = require("./shared/tokenize");
const lint = require("./lint");
const search = require("./search");
const analytics = require("./analytics");

module.exports = {
  findCoreRoot: index.findCoreRoot,
  resolveWikiRoot: index.resolveWikiRoot,
  loadOrBuild: index.loadOrBuild,
  parseHookFrontmatter: frontmatter.parseHookFrontmatter,
  discoverProjects: projects.discoverProjects,
  parseMarkdownTable: markdownTable.parseMarkdownTable,
  tokenize: tokenize.tokenize,
  cmdLint: lint.cmdLint,
  cmdBrief: search.cmdBrief,
  cmdDiff: analytics.cmdDiff,
};
