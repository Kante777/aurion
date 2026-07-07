"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockExplanationEngine = void 0;
class ShockExplanationEngine {
    explain(input) {
        const { fusion, shock, memory } = input;
        // 🔍 find dominant contributors
        const topDrivers = (fusion.contributions || [])
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 3);
        const explanations = [];
        // 🧠 shock logic explanation
        if (shock.acceleration > 0.05) {
            explanations.push("Momentum is accelerating sharply across recent cycles.");
        }
        if (shock.divergence > 0.3) {
            explanations.push("Detector disagreement is increasing (structural instability).");
        }
        if (shock.shockScore > 0.65) {
            explanations.push("System has entered high-stress regime.");
        }
        // 🧠 memory explanation
        if (memory.memorySimilarity > 0.75) {
            explanations.push(`Current structure closely matches pattern: ${memory.closestPattern}`);
        }
        else if (memory.memorySimilarity > 0.5) {
            explanations.push("Moderate similarity to historical instability patterns detected.");
        }
        else {
            explanations.push("No strong historical match found (novel regime).");
        }
        // 🧠 driver breakdown
        const driverInsight = topDrivers.map((d) => `${d.detector} contributed ${(d.weight * 100).toFixed(1)}% influence`);
        return {
            summary: explanations.join(" "),
            drivers: driverInsight,
            riskDrivers: topDrivers.map((d) => d.detector),
            confidence: Math.min(1, (shock.shockScore + shock.divergence + shock.acceleration) / 3)
        };
    }
}
exports.ShockExplanationEngine = ShockExplanationEngine;
