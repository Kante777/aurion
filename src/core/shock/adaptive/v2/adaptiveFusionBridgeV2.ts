export type OutcomeState = "STABLE" | "ACTIVE" | "CRISIS";

export interface FusionMemory {
  shockScore: number;
  predictedState: OutcomeState;
  actualState: OutcomeState;
  error: number;
  confidence: number;
  timestamp: number;
}

export class AdaptiveFusionBridgeV5V5V2 {
  private weights: Record<string, number>;
  private memory: FusionMemory[] = [];

  private decayRate = 0.00001;
  private baseLR = 0.1;

  constructor(initialWeights: Record<string, number>) {
    this.weights = { ...initialWeights };
  }

  public recordFusion(
    evidence: any[],
    fusionResult: { shockScore: number; predictedState: OutcomeState; confidence?: number }
  ) {
    this.memory.push({
      shockScore: fusionResult.shockScore,
      predictedState: fusionResult.predictedState,
      actualState: fusionResult.predictedState, // placeholder until outcome applied
      error: 0,
      confidence: fusionResult.confidence ?? 1,
      timestamp: Date.now()
    });
  }

  public applyOutcome(
    actualState: OutcomeState,
    evidence: any[],
    fusionResult: { shockScore: number; predictedState: OutcomeState; confidence?: number }
  ) {
    const last = this.memory[this.memory.length - 1];
    if (!last) return;

    last.actualState = actualState;

    const error = this.computeError(last.predictedState, actualState);
    last.error = error;

    const age = Date.now() - last.timestamp;

    const lr = this.baseLR * last.confidence * Math.exp(-this.decayRate * age);

    for (const e of evidence) {
      const key = e.detector;
      if (!this.weights[key]) this.weights[key] = 0.1;

      const influence = e.normalizedScore * lr * (1 - error);

      this.weights[key] += influence;
    }

    this.normalize();

    return {
      error,
      updatedWeights: this.weights,
      memorySize: this.memory.length,
      tag: this.classifyError(last.predictedState, actualState)
    };
  }

  private computeError(pred: OutcomeState, actual: OutcomeState): number {
    if (pred === actual) return 0;
    if (pred === "ACTIVE" && actual === "STABLE") return 0.5;
    if (pred === "CRISIS" && actual !== "CRISIS") return 1;
    return 0.3;
  }

  private classifyError(pred: OutcomeState, actual: OutcomeState) {
    if (pred === actual) return "CORRECT";
    if (pred === "CRISIS" && actual !== "CRISIS") return "FALSE_POSITIVE";
    if (pred !== "CRISIS" && actual === "CRISIS") return "MISSED_CRISIS";
    return "REGIME_SHIFT";
  }

  private normalize() {
    const sum = Object.values(this.weights).reduce((a, b) => a + b, 0);
    for (const k in this.weights) {
      this.weights[k] = this.weights[k] / sum;
    }
  }

  public getWeights() {
    return this.weights;
  }

  public getMemory() {
    return this.memory;
  }
}
