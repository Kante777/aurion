export type Regime = "STABLE" | "ACTIVE" | "CRISIS";

export function computeEntropy(weights: Record<string, number>) {
  return -Object.values(weights)
    .map(w => w * Math.log(w + 1e-8))
    .reduce((a, b) => a + b, 0);
}

export function regimeLearningRate(regime: Regime, entropy: number) {
  const base =
    regime === "CRISIS" ? 0.12 :
    regime === "ACTIVE" ? 0.05 :
    0.01;

  const entropyBoost = entropy > 1 ? 1.5 : 1;

  return base * entropyBoost;
}
