function extractFrontmatterBlock(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return { fm: match[1], body: content.slice(match[0].length) };
}

function parseFields(fm, fieldDefs) {
  const result = {};
  for (const [key, def] of Object.entries(fieldDefs)) {
    const m = fm.match(def.regex);
    if (!m) { result[key] = def.default; continue; }
    if (def.array) {
      result[key] = m[1].split(",").map((s) => s.trim().replace(/["']/g, ""));
      if (def.transform) result[key] = result[key].map(def.transform);
    } else {
      result[key] = m[1].trim();
      if (def.transform) result[key] = def.transform(result[key]);
    }
  }
  return result;
}

function extractLinks(body) {
  const linkMatches = [...body.matchAll(/(?:(\w[\w-]*)::)?\[\[([^\]]+)\]\]/g)];
  const codeRanges = [];
  for (const cm of [...body.matchAll(/```[\s\S]*?```/g)]) {
    codeRanges.push([cm.index, cm.index + cm[0].length]);
  }
  for (const im of [...body.matchAll(/`[^`\n]+`/g)]) {
    codeRanges.push([im.index, im.index + im[0].length]);
  }
  function inCodeBlock(idx) {
    for (const [start, end] of codeRanges) {
      if (idx >= start && idx < end) return true;
    }
    return false;
  }
  const filteredMatches = linkMatches.filter((m) => !inCodeBlock(m.index));
  const rawLinks = filteredMatches.map((m) => m[2]);
  const links = rawLinks.filter((l) => !l.startsWith("sys:"));
  const sysLinks = rawLinks.filter((l) => l.startsWith("sys:")).map((l) => l.slice(4));
  const edges = [];
  const edgeTypeSet = new Set();
  for (const m of filteredMatches) {
    const edgeType = m[1] || null;
    const target = m[2];
    if (edgeType) {
      edges.push({ type: edgeType, target });
      edgeTypeSet.add(edgeType);
    }
  }
  return { links, sysLinks, edges, edgeTypes: [...edgeTypeSet] };
}

function extractHeadings(body) {
  return [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2].trim(),
  }));
}

const WIKI_FIELD_DEFS = {
  type: { regex: /^type:\s*(.+)$/m, default: "" },
  tags: { regex: /^tags:\s*\[(.+)\]/m, default: [], array: true },
  date: { regex: /^date:\s*(.+)$/m, default: "" },
  project: { regex: /^project:\s*(.+)$/m, default: "" },
  sources: {
    regex: /^sources:\s*\[(.+)\]/m,
    default: [],
    array: true,
    transform: (s) => s.replace(/\.md$/, "").replace(/^sources\//, ""),
  },
};

const HOOK_FIELD_DEFS = {
  intent: { regex: /^\s*intent:\s*(.+)$/m, default: "" },
  signals: { regex: /^\s*signals:\s*\[(.+)\]/m, default: [], array: true },
  guard: { regex: /^\s*guard:\s*(.+)$/m, default: null },
};

function parseWikiFrontmatter(content) {
  const block = extractFrontmatterBlock(content);
  if (!block) {
    return { meta: { type: "", tags: [], date: "", project: "", sources: [] }, body: content, links: [], sysLinks: [], edges: [], edgeTypes: [], headings: [] };
  }
  const meta = parseFields(block.fm, WIKI_FIELD_DEFS);
  const { links, sysLinks, edges, edgeTypes } = extractLinks(block.body);
  const headings = extractHeadings(block.body);
  return { meta, body: block.body, links, sysLinks, edges, edgeTypes, headings };
}

function parseHookFrontmatter(content) {
  const block = extractFrontmatterBlock(content);
  if (!block) return null;
  return parseFields(block.fm, HOOK_FIELD_DEFS);
}

module.exports = {
  extractFrontmatterBlock,
  parseFields,
  extractLinks,
  extractHeadings,
  parseWikiFrontmatter,
  parseHookFrontmatter,
  WIKI_FIELD_DEFS,
  HOOK_FIELD_DEFS,
};
