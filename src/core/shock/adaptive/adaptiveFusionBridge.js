"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveFusionBridgeV5 = void 0;
class AdaptiveFusionBridgeV5 {
    weights = {
        volatility_detector: 0.33,
        liquidity_detector: 0.33,
        spread_detector: 0.34
    };
    fuse(evidence) {
        const shockScore = evidence.reduce((sum, e) => sum + (e.score ?? 0), 0) /
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
    applyOutcome(state, evidence, result) {
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
exports.AdaptiveFusionBridgeV5 = AdaptiveFusionBridgeV5;
