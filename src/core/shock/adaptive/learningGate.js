"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningGate = void 0;
class LearningGate {
    lastRegime = null;
    regimeStability = 0;
    evaluate(predicted, actual, confidence) {
        const regimeShift = this.lastRegime && this.lastRegime !== actual;
        this.lastRegime = actual;
        // 🔥 base error
        let error = predicted === actual ? 0 : 0.5;
        // 🔥 confidence scaling
        error *= (1 - confidence);
        // �� regime instability penalty
        if (regimeShift) {
            error *= 1.5;
            this.regimeStability = 0;
        }
        else {
            this.regimeStability += 1;
        }
        // 🔥 stability damping (prevents oscillation learning)
        const damping = 1 / (1 + this.regimeStability * 0.1);
        error *= damping;
        return {
            error,
            regimeShift,
            damping,
            stability: this.regimeStability
        };
    }
}
exports.LearningGate = LearningGate;
