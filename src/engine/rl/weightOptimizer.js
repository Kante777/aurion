"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightOptimizer = void 0;
class WeightOptimizer {
    bus;
    weights = new Map();
    constructor(bus) {
        this.bus = bus;
        this.attach();
    }
    attach() {
        this.bus.on("REWARD_SIGNAL", (signal) => {
            this.adjust(signal);
        });
    }
    adjust(signal) {
        const key = signal.instrument;
        const current = this.weights.get(key) || 0.5;
        const learningRate = 0.1;
        const delta = signal.reward * learningRate;
        const updated = this.clamp(current + delta);
        this.weights.set(key, updated);
        const update = {
            target: key,
            currentWeight: current,
            adjustedWeight: updated,
            delta
        };
        this.bus.emit("WEIGHT_UPDATED", update);
    }
    clamp(value) {
        return Math.max(0, Math.min(1, value));
    }
    getWeight(key) {
        return this.weights.get(key) || 0.5;
    }
}
exports.WeightOptimizer = WeightOptimizer;
