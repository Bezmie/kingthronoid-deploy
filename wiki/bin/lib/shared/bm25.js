const K1 = 1.2;
const B = 0.75;

function computeIdf(docFreq, totalDocs) {
  return Math.log((totalDocs - docFreq + 0.5) / (docFreq + 0.5) + 1);
}

function bm25Score(tf, docLen, avgDocLen, idf) {
  const num = tf * (K1 + 1);
  const denom = tf + K1 * (1 - B + B * (docLen / avgDocLen));
  return idf * (num / denom);
}

function computeTermFreq(tokens) {
  const tf = {};
  for (const t of tokens) {
    tf[t] = (tf[t] || 0) + 1;
  }
  return tf;
}

module.exports = { K1, B, computeIdf, bm25Score, computeTermFreq };
