import { FusionResult } from "./types";

export class AdaptiveFusionBridgeV5 {
  private weights: Record<string, number> = {
    volatility_detector: 0.33,
    liquidity_detector: 0.33,
    spread_detector: 0.34
  };

  fuse(evidence: any[]): FusionResult {
    const shockScore =
      evidence.reduce((sum, e) => sum + (e.score ?? 0), 0) /
      Math.max(evidence.length, 1);

    return {
      shockScore,
      state: shockScore > 0.6 ? "ACTIVE" : "STABLE",
      contributions: evidence.map(e => ({
        detector: e.detector ?? "unknown",
        score: e.score ?? 0,
        confidence: e.confidence ?? 1,
        weight: this.weights[e.detector] ?? 0.33
      }))
    };
  }

  applyOutcome(state: string, evidence: any[], result: FusionResult) {
    return {
      state,
      updatedWeights: this.weights,
      memorySize: 1
    };
  }

  getWeights() {
    return this.weights;
  }
}
