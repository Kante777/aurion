"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveEngine = void 0;
class AdaptiveEngine {
    weights = {};
    history = [];
    update(sample) {
        const error = sample?.error ?? 0;
        this.history.push(error);
        const avgError = this.history.reduce((a, b) => a + b, 0) /
            this.history.length;
        // simple adaptation rule
        this.weights["global"] = Math.max(0.1, 1 - avgError);
        return {
            updated: true,
            error,
            avgError
        };
    }
    getWeights() {
        return this.weights;
    }
}
exports.AdaptiveEngine = AdaptiveEngine;
