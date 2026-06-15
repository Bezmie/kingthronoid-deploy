const fs = require("fs");
const path = require("path");
const { findCoreRoot, discoverProjects, parseMarkdownTable } = require("../../../wiki/bin/lib/public-api");

function listProjects(coreRoot) {
  if (!coreRoot) coreRoot = findCoreRoot(process.cwd());
  return discoverProjects(coreRoot);
}

function parseAgentsMd(projectDir) {
  const filePath = path.join(projectDir, "AGENTS.md");
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  const sections = {};
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(\d+)\.\s+(.+)/);
    if (headingMatch) {
      if (currentSection) {
        sections[currentSection] = currentLines.join("\n");
      }
      currentSection = headingMatch[2].trim();
      currentLines = [];
    } else if (currentSection) {
      currentLines.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = currentLines.join("\n");
  }

  const architecture = extractArchitecture(sections["ARCHITECTURE"] || "");
  const conventions = extractConventions(sections["CONVENTIONS"] || "");
  const paths = extractPaths(sections["PATHS"] || "");
  const workflows = extractWorkflows(sections["WORKFLOWS"] || "");

  return { architecture, conventions, paths, workflows, raw: sections };
}

function extractArchitecture(text) {
  const rows = parseMarkdownTable(text, ["layer", "files"]);
  const desc = text.split(/\r?\n/).find(l => !l.trim().startsWith("|") && l.trim().length > 0 && !l.startsWith("#"));
  return { layers: rows, description: desc ? desc.trim() : "" };
}

function extractConventions(text) {
  const rules = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*\d+\.\s+(.+)/);
    if (m) rules.push(m[1].trim());
  }
  return rules;
}

function extractPaths(text) {
  const paths = {};
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^- (.+?):\s*(.+)/);
    if (m) paths[m[1].trim()] = m[2].trim();
  }
  return paths;
}

function extractWorkflows(text) {
  return parseMarkdownTable(text, ["hook", "intent"]);
}

function parseRoadmap(projectDir) {
  const filePath = path.join(projectDir, "ROADMAP.md");
  if (!fs.existsSync(filePath)) return { tasks: [], research: [] };

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  const tasks = [];
  const research = [];
  let section = null;

  for (const line of lines) {
    const hMatch = line.match(/^##\s+(.+)/);
    if (hMatch) {
      const heading = hMatch[1].trim().toLowerCase();
      if (heading.includes("задач") || heading.includes("task")) section = "tasks";
      else if (heading.includes("ресерч") || heading.includes("research")) section = "research";
      else section = null;
      continue;
    }

    const liMatch = line.match(/^\s*-\s+(.+)/);
    if (liMatch && section) {
      (section === "tasks" ? tasks : research).push(liMatch[1].trim());
    }
  }

  return { tasks, research };
}

function loadProjectInfo(coreRoot, projectName) {
  const projects = listProjects(coreRoot);
  const proj = projectName
    ? projects.find((p) => p.name === projectName)
    : projects[0];

  if (!proj) return null;

  const agents = parseAgentsMd(proj.dir);
  const roadmap = parseRoadmap(proj.dir);

  return {
    name: proj.name,
    dir: proj.dir,
    architecture: agents ? agents.architecture : null,
    conventions: agents ? agents.conventions : [],
    workflows: agents ? agents.workflows : [],
    roadmap,
  };
}

function formatProjectInfo(info) {
  if (!info) return "no project found";

  const lines = [];
  lines.push(`project: ${info.name}`);
  lines.push(`dir: ${info.dir}`);

  if (info.architecture) {
    lines.push(`architecture: ${info.architecture.description}`);
    for (const layer of info.architecture.layers) {
      lines.push(`  ${layer.layer}: ${layer.files}`);
    }
  }

  if (info.conventions.length > 0) {
    lines.push(`conventions: ${info.conventions.length} rules`);
    for (let i = 0; i < Math.min(info.conventions.length, 3); i++) {
      lines.push(`  ${i + 1}. ${info.conventions[i]}`);
    }
    if (info.conventions.length > 3) {
      lines.push(`  ... +${info.conventions.length - 3} more`);
    }
  }

  lines.push(`roadmap: ${info.roadmap.tasks.length} tasks, ${info.roadmap.research.length} research`);

  return lines.join("\n");
}

module.exports = {
  listProjects,
  parseAgentsMd,
  parseRoadmap,
  loadProjectInfo,
  formatProjectInfo,
};
