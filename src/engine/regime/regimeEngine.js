"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeEngine = void 0;
class RegimeEngine {
    detect(events) {
        let volatilityScore = 0;
        let sentimentBias = 0;
        for (const e of events) {
            if (e.type === "NEWS") {
                volatilityScore += e.data.impact === "HIGH" ? 2 : 1;
            }
            if (e.type === "BELIEF") {
                sentimentBias += e.data.direction === "BUY" ? 1 : -1;
            }
        }
        const absBias = Math.abs(sentimentBias);
        if (volatilityScore > 3 && absBias > 2) {
            return "VOLATILE";
        }
        if (absBias <= 1) {
            return "RANGING";
        }
        if (sentimentBias > 2) {
            return "TRENDING";
        }
        if (sentimentBias < -2) {
            return "TRENDING";
        }
        return "UNCERTAIN";
    }
}
exports.RegimeEngine = RegimeEngine;
