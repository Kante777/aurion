"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadDetector = void 0;
class SpreadDetector {
    name = "spread_detector";
    detect(input) {
        const spread = input?.spread ?? 0;
        const avgSpread = input?.avgSpread ?? 0.0001;
        if (avgSpread === 0)
            return null;
        const expansion = spread / avgSpread;
        const score = Math.min(1, (expansion - 1) / 5);
        if (score < 0.05)
            return null;
        return {
            detector: this.name,
            metric: "spread",
            rawValue: spread,
            normalizedScore: score,
            confidence: 0.78,
            explanation: `Spread expansion detected (${expansion.toFixed(2)}x average)`,
            timestamp: Date.now()
        };
    }
}
exports.SpreadDetector = SpreadDetector;
