"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockEngine = void 0;
class ShockEngine {
    detector;
    constructor(detector) {
        this.detector = detector;
    }
    run() {
        const stress = this.detector.computeStress();
        return {
            timestamp: Date.now(),
            systemStress: stress,
            alert: stress.level === "CRITICAL"
                ? "SYSTEM_UNSTABLE"
                : stress.level === "HIGH"
                    ? "ELEVATED_RISK"
                    : "STABLE"
        };
    }
}
exports.ShockEngine = ShockEngine;
