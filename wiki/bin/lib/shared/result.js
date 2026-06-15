function basename(name) {
  return name.split("/").pop();
}

function pageToResult(page, extra) {
  const r = {
    name: page.pageName,
    type: page.meta.type,
    tags: page.meta.tags,
    date: page.meta.date,
    title: page.title,
    summary: page.summary,
  };
  if (extra) Object.assign(r, extra);
  return r;
}

module.exports = { basename, pageToResult };
