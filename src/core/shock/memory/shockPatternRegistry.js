"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockPatternRegistry = void 0;
class ShockPatternRegistry {
    patterns = [
        {
            name: "liquidity_squeeze_break",
            vector: [0.6, 0.5, 0.4],
            outcome: "CRASH"
        },
        {
            name: "volatility_expansion_retest",
            vector: [0.5, 0.3, 0.2],
            outcome: "REVERSAL"
        },
        {
            name: "correlation_decoupling",
            vector: [0.4, 0.6, 0.5],
            outcome: "CONTINUATION"
        }
    ];
    getPatterns() {
        return this.patterns;
    }
}
exports.ShockPatternRegistry = ShockPatternRegistry;
