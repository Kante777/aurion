"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockEngine = void 0;
const divergenceEngine_1 = require("./divergenceEngine");
const shockMemoryEngine_1 = require("../memory/shockMemoryEngine");
const shockExplanationEngine_1 = require("../explain/shockExplanationEngine");
const shockActionEngine_1 = require("../action/shockActionEngine");
const shockAdaptiveWeightEngine_1 = require("../adaptation/shockAdaptiveWeightEngine");
class ShockEngine {
    divergenceEngine = new divergenceEngine_1.DivergenceEngine();
    memoryEngine = new shockMemoryEngine_1.ShockMemoryEngine();
    explainEngine = new shockExplanationEngine_1.ShockExplanationEngine();
    actionEngine = new shockActionEngine_1.ShockActionEngine();
    adaptiveEngine = new shockAdaptiveWeightEngine_1.ShockAdaptiveWeightEngine();
    lastShock = 0;
    analyze(fusionResult, calibrationData) {
        const shockScore = Number(fusionResult.shockScore ?? 0);
        const acceleration = shockScore - this.lastShock;
        const divergence = this.divergenceEngine.compute(fusionResult.contributions || []);
        const state = shockScore > 0.75 ? "CRITICAL" :
            shockScore > 0.45 ? "ACTIVE" :
                "CALM";
        const memory = this.memoryEngine.process({
            shockScore,
            acceleration,
            divergence,
            state,
            timestamp: Date.now()
        });
        // 🧠 ADAPTATION STEP (NEW)
        let adaptationResult = null;
        if (calibrationData) {
            adaptationResult = this.adaptiveEngine.adapt(calibrationData);
        }
        const explanation = this.explainEngine.explain({
            fusion: fusionResult,
            shock: { shockScore, acceleration, divergence },
            memory
        });
        const action = this.actionEngine.decide({
            shockScore,
            acceleration,
            divergence,
            memorySimilarity: memory.memorySimilarity,
            predictedOutcome: memory.predictedOutcome
        });
        const earlyWarning = (acceleration > 0.08 && divergence > 0.35) ||
            shockScore > 0.65;
        this.lastShock = shockScore;
        return {
            shockScore,
            acceleration,
            divergence,
            state,
            earlyWarning,
            // 🧠 MEMORY
            memorySimilarity: memory.memorySimilarity,
            closestPattern: memory.closestPattern,
            predictedOutcome: memory.predictedOutcome,
            // 🧠 EXPLANATION
            explanation: explanation.summary,
            drivers: explanation.drivers,
            riskDrivers: explanation.riskDrivers,
            confidence: explanation.confidence,
            // 🧠 ACTION
            ...action,
            // 🧠 ADAPTATION (NEW)
            adaptation: adaptationResult
        };
    }
}
exports.ShockEngine = ShockEngine;
