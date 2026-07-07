"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptationMonitor = void 0;
class AdaptationMonitor {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    run(stressEvents) {
        const result = this.engine.processStress(stressEvents);
        const stability = (result.state.stabilityWeight +
            result.state.executionWeight +
            result.state.reasoningWeight) / 3;
        return {
            timestamp: Date.now(),
            evolution: result.state,
            signals: result.signals,
            status: stability > 1.2
                ? "OVERFITTING_RISK"
                : stability > 1
                    ? "EVOLVING_STABLE"
                    : "UNDERPOWERED"
        };
    }
}
exports.AdaptationMonitor = AdaptationMonitor;
