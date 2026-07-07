"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockActionEngine = void 0;
class ShockActionEngine {
    decide(input) {
        const { shockScore, acceleration, divergence, memorySimilarity, predictedOutcome } = input;
        // 🧠 RISK CLASSIFICATION
        let riskLevel = "LOW";
        if (shockScore > 0.75 || divergence > 0.5) {
            riskLevel = "CRITICAL";
        }
        else if (shockScore > 0.55 || acceleration > 0.05) {
            riskLevel = "HIGH";
        }
        else if (shockScore > 0.35) {
            riskLevel = "MEDIUM";
        }
        // 🧠 ACTION LOGIC
        let action = "HOLD";
        let bias = "NEUTRAL";
        if (riskLevel === "CRITICAL") {
            action = "EXIT";
        }
        if (riskLevel === "HIGH") {
            action = memorySimilarity > 0.7 ? "REDUCE_RISK" : "WAIT";
        }
        if (riskLevel === "MEDIUM") {
            action = "MONITOR";
        }
        // 🧠 BIAS LOGIC
        if (predictedOutcome === "CRASH")
            bias = "BEARISH";
        if (predictedOutcome === "REVERSAL")
            bias = "NEUTRAL";
        if (predictedOutcome === "CONTINUATION")
            bias = "BULLISH";
        // 🧠 POSITION SIZING HINT
        const positionSizingHint = riskLevel === "CRITICAL" ? 0 :
            riskLevel === "HIGH" ? 0.25 :
                riskLevel === "MEDIUM" ? 0.5 :
                    1;
        return {
            action,
            bias,
            riskLevel,
            positionSizingHint,
            reasoningTrace: {
                shockScore,
                acceleration,
                divergence,
                memorySimilarity,
                predictedOutcome
            }
        };
    }
}
exports.ShockActionEngine = ShockActionEngine;
