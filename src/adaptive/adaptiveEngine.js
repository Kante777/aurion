"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveEngine = void 0;
class AdaptiveEngine {
    state = {
        version: 1,
        stabilityWeight: 1,
        executionWeight: 1,
        reasoningWeight: 1
    };
    processStress(events) {
        const signals = [];
        for (const e of events) {
            if (e.stabilityImpact < 0.5) {
                signals.push({
                    module: "stability",
                    adjustment: +0.1,
                    reason: "low_stability_detected"
                });
            }
            if (e.executionImpact < 0.5) {
                signals.push({
                    module: "execution",
                    adjustment: +0.1,
                    reason: "execution_failure_pressure"
                });
            }
            if (e.sovereigntyImpact < 0.5) {
                signals.push({
                    module: "reasoning",
                    adjustment: +0.1,
                    reason: "sovereignty_instability"
                });
            }
        }
        this.apply(signals);
        return {
            signals,
            state: this.state
        };
    }
    apply(signals) {
        for (const s of signals) {
            if (s.module === "stability") {
                this.state.stabilityWeight += s.adjustment;
            }
            if (s.module === "execution") {
                this.state.executionWeight += s.adjustment;
            }
            if (s.module === "reasoning") {
                this.state.reasoningWeight += s.adjustment;
            }
        }
        this.state.version += 1;
    }
    getState() {
        return this.state;
    }
}
exports.AdaptiveEngine = AdaptiveEngine;
