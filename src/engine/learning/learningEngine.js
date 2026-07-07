"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningEngine = void 0;
class LearningEngine {
    bus;
    outcomes = new Map();
    patternStats = new Map();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("TRADE_OUTCOME_RECORDED", (outcome) => {
            this.processOutcome(outcome);
        });
        this.bus.on("EXECUTION_CANDIDATE_CREATED", (exec) => {
            this.trackExecution(exec);
        });
    }
    trackExecution(exec) {
        // store for future matching with outcome
        this.outcomes.set(exec.id, {
            id: exec.id,
            instrument: exec.instrument,
            executionId: exec.id,
            outcome: "INVALIDATED",
            profitLoss: 0,
            maxFavorableExcursion: 0,
            maxAdverseExcursion: 0,
            duration: 0,
            timestamp: Date.now(),
        });
    }
    processOutcome(outcome) {
        this.outcomes.set(outcome.executionId, outcome);
        this.updatePatternMemory(outcome);
        this.updateBeliefMemory(outcome);
        this.bus.emit("LEARNING_UPDATED", outcome);
    }
    // =========================
    // PATTERN MEMORY
    // =========================
    updatePatternMemory(outcome) {
        const key = outcome.instrument;
        const existing = this.patternStats.get(key) || {
            wins: 0,
            losses: 0,
            total: 0,
        };
        existing.total += 1;
        if (outcome.outcome === "TP_HIT") {
            existing.wins += 1;
        }
        else if (outcome.outcome === "SL_HIT") {
            existing.losses += 1;
        }
        this.patternStats.set(key, existing);
    }
    // =========================
    // BELIEF MEMORY
    // =========================
    updateBeliefMemory(outcome) {
        const reliabilityScore = outcome.outcome === "TP_HIT"
            ? 1
            : outcome.outcome === "SL_HIT"
                ? 0
                : 0.5;
        // emit adjustment signal for Belief Engine
        this.bus.emit("BELIEF_REINFORCEMENT", {
            instrument: outcome.instrument,
            adjustment: reliabilityScore,
        });
    }
    getStats(instrument) {
        return this.patternStats.get(instrument);
    }
}
exports.LearningEngine = LearningEngine;
