"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionCoreBridge = void 0;
class FusionCoreBridge {
    weights = {
        volatility_detector: 0.33,
        liquidity_detector: 0.33,
        spread_detector: 0.34
    };
    fuse(evidence) {
        return evidence;
    }
    applyOutcome(state, evidence, result) {
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
exports.FusionCoreBridge = FusionCoreBridge;
