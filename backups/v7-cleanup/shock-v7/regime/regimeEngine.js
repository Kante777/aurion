"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regimeEngine = exports.RegimeEngine = void 0;
class RegimeEngine {
    analyze(evidence) {
        const volatility = evidence.volatility;
        const liquidity = evidence.liquidity;
        const spread = evidence.spread;
        if (volatility > 0.75) {
            return {
                regime: "VOLATILE",
                confidence: volatility
            };
        }
        if (liquidity > 0.75) {
            return {
                regime: "LIQUIDITY_DRIVEN",
                confidence: liquidity
            };
        }
        if (spread > 0.7) {
            return {
                regime: "DISORDERED",
                confidence: spread
            };
        }
        return {
            regime: "STABLE",
            confidence: 1 - volatility
        };
    }
}
exports.RegimeEngine = RegimeEngine;
exports.regimeEngine = new RegimeEngine();
