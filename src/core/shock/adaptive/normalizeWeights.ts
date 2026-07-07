export function normalizeWeights(weights: Record<string, number>) {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);

  if (sum === 0) return weights;

  const out: Record<string, number> = {};

  for (const k in weights) {
    out[k] = weights[k] / sum;
  }

  return out;
}
