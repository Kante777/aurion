"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeScorer = void 0;
class RegimeScorer {
    score(evidence) {
        const avg = (key) => evidence.reduce((s, e) => s + (e[key] ?? 0), 0) / evidence.length;
        const volatility = avg("score") * 0.8 + Math.random() * 0.2;
        const liquidityStress = avg("confidence") < 0.7 ? 0.7 : 0.3;
        const spreadStress = avg("score") > 0.75 ? 0.6 : 0.2;
        let regime = "STABLE";
        if (volatility > 0.75)
            regime = "VOLATILE";
        else if (spreadStress > 0.5 && liquidityStress > 0.5)
            regime = "MANIPULATION";
        else if (volatility > 0.55)
            regime = "TRENDING";
        else if (volatility < 0.3)
            regime = "RANGING";
        return {
            regime,
            confidence: Math.min(1, (volatility + liquidityStress + spreadStress) / 3),
            volatilityIndex: volatility,
            liquidityStress,
            spreadStress
        };
    }
}
exports.RegimeScorer = RegimeScorer;
