export function applyRegimeCoupledLearning(
  weights: Record<string, number>,
  error: number
): Record<string, number> {
  const keys = Object.keys(weights);

  const adjusted: Record<string, number> = {};
  let total = 0;

  for (const k of keys) {
    const delta = (1 - error) * weights[k] + error * (1 / keys.length);
    adjusted[k] = delta;
    total += delta;
  }

  // normalize
  for (const k of keys) {
    adjusted[k] = adjusted[k] / total;
  }

  return adjusted;
}
