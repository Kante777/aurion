"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolatilityDetector = void 0;
class VolatilityDetector {
    name = "volatility_detector";
    detect(input) {
        const volatility = input?.volatility ?? 0;
        const atr = input?.atr ?? 0;
        if (volatility === 0 && atr === 0)
            return null;
        const score = Math.min(1, (volatility * 0.6) + (atr * 0.4));
        return {
            detector: this.name,
            metric: "volatility",
            rawValue: volatility,
            normalizedScore: score,
            confidence: 0.85,
            explanation: `Volatility expansion detected (vol=${volatility}, atr=${atr})`,
            timestamp: Date.now()
        };
    }
}
exports.VolatilityDetector = VolatilityDetector;
