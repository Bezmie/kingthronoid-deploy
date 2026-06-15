function parseMarkdownTable(text, columns) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  let inTableHeader = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (trimmed.includes("---")) {
        inTableHeader = true;
        continue;
      }
      if (inTableHeader || rows.length > 0) {
        const cells = trimmed.split("|").filter((c) => c.trim()).map((c) => c.trim());
        if (columns && columns.length) {
          const row = {};
          columns.forEach((col, i) => {
            row[col] = cells[i] !== undefined ? cells[i].replace(/\*\*/g, "") : "";
          });
          rows.push(row);
        } else {
          rows.push(cells);
        }
      }
    } else {
      inTableHeader = false;
    }
  }
  return rows;
}

module.exports = { parseMarkdownTable };
