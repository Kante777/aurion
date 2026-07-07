"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReinforcementEngine = void 0;
class ReinforcementEngine {
    feedback;
    correlation;
    temporal;
    constructor(feedback, correlation, temporal) {
        this.feedback = feedback;
        this.correlation = correlation;
        this.temporal = temporal;
    }
    /**
     * Apply learning signal across all subsystems
     */
    applyLearning(signal) {
        if (!signal)
            return;
        const { instrument, adjustment } = signal;
        // =========================
        // 1. UPDATE TEMPORAL LEAD SCORE
        // =========================
        const profile = this.temporal.profiles?.get(instrument);
        if (profile) {
            profile.leadScore = this.clamp(profile.leadScore + adjustment);
            profile.lagScore = this.clamp(profile.lagScore - adjustment);
        }
        // =========================
        // 2. UPDATE CORRELATION STRENGTH (simplified global shift)
        // =========================
        const matrix = this.correlation.correlationMatrix;
        if (matrix) {
            for (const [key, value] of matrix.entries()) {
                matrix.set(key, this.clamp(value + adjustment * 0.1));
            }
        }
        // =========================
        // 3. LOG UPDATE
        // =========================
        console.log("🧠 REINFORCEMENT APPLIED:", {
            instrument,
            adjustment
        });
    }
    /**
     * Run full feedback cycle
     */
    runCycle(outcome) {
        const signal = this.feedback.generateLearningSignal(outcome);
        if (!signal)
            return;
        this.applyLearning(signal);
    }
    clamp(v) {
        return Math.max(-1, Math.min(1, v));
    }
}
exports.ReinforcementEngine = ReinforcementEngine;
