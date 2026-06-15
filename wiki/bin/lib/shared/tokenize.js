function tokenize(text, opts) {
  let s = text.toLowerCase();
  if (opts && opts.replaceSlashes) s = s.replace(/[/]/g, " ");
  s = s.replace(/[^а-яёa-z0-9\s]/g, " ");
  return s.split(/\s+/).filter((t) => t.length > 1);
}

module.exports = { tokenize };
