"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityDetector = void 0;
class LiquidityDetector {
    name = "liquidity_detector";
    detect(input) {
        const depth = input?.liquidityDepth ?? 1;
        const imbalance = input?.orderImbalance ?? 0;
        const score = Math.min(1, (1 - depth) * 0.7 +
            Math.abs(imbalance) * 0.3);
        if (score < 0.1)
            return null;
        return {
            detector: this.name,
            metric: "liquidity",
            rawValue: depth,
            normalizedScore: score,
            confidence: 0.80,
            explanation: `Liquidity stress detected (depth=${depth}, imbalance=${imbalance})`,
            timestamp: Date.now()
        };
    }
}
exports.LiquidityDetector = LiquidityDetector;
