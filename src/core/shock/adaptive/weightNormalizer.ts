export class WeightNormalizer {
  static normalize(weights: Record<string, number>) {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);

    const normalized: Record<string, number> = {};

    for (const k in weights) {
      normalized[k] = weights[k] / sum;
    }

    return normalized;
  }
}
