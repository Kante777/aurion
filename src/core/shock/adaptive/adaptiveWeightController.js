"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveWeightController = void 0;
class AdaptiveWeightController {
    adjustments = {};
    update(detector, error) {
        const current = this.adjustments[detector] ?? 0;
        // 🔥 stronger learning signal
        const learningRate = 0.2;
        // reward good predictions, punish bad ones
        const delta = (1 - error) * learningRate - error * learningRate;
        this.adjustments[detector] = current + delta;
    }
    get(detector) {
        return this.adjustments[detector] ?? 0;
    }
    snapshot() {
        return { ...this.adjustments };
    }
}
exports.AdaptiveWeightController = AdaptiveWeightController;
