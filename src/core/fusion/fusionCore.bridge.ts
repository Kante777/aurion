import { AdaptiveBridge } from "./fusionCore.bridge.contract";

export class FusionCoreBridge implements AdaptiveBridge {
  private weights: Record<string, number> = {
    volatility_detector: 0.33,
    liquidity_detector: 0.33,
    spread_detector: 0.34
  };

  fuse(evidence: any[]) {
    return evidence;
  }

  applyOutcome(state: string, evidence: any[], result: any) {
    return {
      state,
      updated: this.weights,
      memorySize: 1
    };
  }

  getWeights() {
    return this.weights;
  }
}
