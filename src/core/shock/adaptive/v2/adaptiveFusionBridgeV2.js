"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveFusionBridgeV5V5V2 = void 0;
class AdaptiveFusionBridgeV5V5V2 {
    weights;
    memory = [];
    decayRate = 0.00001;
    baseLR = 0.1;
    constructor(initialWeights) {
        this.weights = { ...initialWeights };
    }
    recordFusion(evidence, fusionResult) {
        this.memory.push({
            shockScore: fusionResult.shockScore,
            predictedState: fusionResult.predictedState,
            actualState: fusionResult.predictedState, // placeholder until outcome applied
            error: 0,
            confidence: fusionResult.confidence ?? 1,
            timestamp: Date.now()
        });
    }
    applyOutcome(actualState, evidence, fusionResult) {
        const last = this.memory[this.memory.length - 1];
        if (!last)
            return;
        last.actualState = actualState;
        const error = this.computeError(last.predictedState, actualState);
        last.error = error;
        const age = Date.now() - last.timestamp;
        const lr = this.baseLR * last.confidence * Math.exp(-this.decayRate * age);
        for (const e of evidence) {
            const key = e.detector;
            if (!this.weights[key])
                this.weights[key] = 0.1;
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
    computeError(pred, actual) {
        if (pred === actual)
            return 0;
        if (pred === "ACTIVE" && actual === "STABLE")
            return 0.5;
        if (pred === "CRISIS" && actual !== "CRISIS")
            return 1;
        return 0.3;
    }
    classifyError(pred, actual) {
        if (pred === actual)
            return "CORRECT";
        if (pred === "CRISIS" && actual !== "CRISIS")
            return "FALSE_POSITIVE";
        if (pred !== "CRISIS" && actual === "CRISIS")
            return "MISSED_CRISIS";
        return "REGIME_SHIFT";
    }
    normalize() {
        const sum = Object.values(this.weights).reduce((a, b) => a + b, 0);
        for (const k in this.weights) {
            this.weights[k] = this.weights[k] / sum;
        }
    }
    getWeights() {
        return this.weights;
    }
    getMemory() {
        return this.memory;
    }
}
exports.AdaptiveFusionBridgeV5V5V2 = AdaptiveFusionBridgeV5V5V2;
