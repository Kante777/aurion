"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionEngine = void 0;
class FusionEngine {
    fuse(input) {
        const shock = input.shock?.systemStress?.score || 0;
        const crisis = input.crisis?.crisis?.probability || 0;
        const behavior = input.behavioral?.fingerprint?.confidence || 0;
        const portfolioRisk = input.portfolio?.totalRisk || 0;
        const riskLevel = (shock * 0.3 +
            crisis * 0.3 +
            portfolioRisk * 0.2 +
            behavior * 0.2);
        let marketState = "STABLE";
        if (riskLevel > 0.75)
            marketState = "CRISIS";
        else if (riskLevel > 0.55)
            marketState = "FRAGILE";
        else if (behavior > 0.6)
            marketState = "EXPANSION";
        const opportunityScore = input.portfolio?.positions?.length > 0
            ? input.portfolio.positions.reduce((s, p) => s + (p.adjustedConfidence || 0), 0) / input.portfolio.positions.length
            : 0;
        const dominantSignal = marketState === "CRISIS"
            ? "DELEVERAGE"
            : marketState === "FRAGILE"
                ? "REDUCE_RISK"
                : marketState === "EXPANSION"
                    ? "AGGRESSIVE_DEPLOYMENT"
                    : "NEUTRAL";
        return {
            marketState,
            riskLevel,
            opportunityScore,
            dominantSignal,
            confidence: Math.min(1, 1 - riskLevel),
            actions: this.generateActions(marketState)
        };
    }
    generateActions(state) {
        switch (state) {
            case "CRISIS":
                return [
                    "HEDGE_ALL_POSITIONS",
                    "REDUCE_LEVERAGE",
                    "EXIT_CORRELATED_EXPOSURE"
                ];
            case "FRAGILE":
                return [
                    "REDUCE_POSITION_SIZE",
                    "TIGHTEN_STOP_LOGIC"
                ];
            case "EXPANSION":
                return [
                    "INCREASE_RISK_BUDGET",
                    "FOLLOW_TREND_MOMENTUM"
                ];
            default:
                return [
                    "MAINTAIN_POSITIONING"
                ];
        }
    }
}
exports.FusionEngine = FusionEngine;
