"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyEngine = void 0;
class StrategyEngine {
    compiler;
    constructor(compiler) {
        this.compiler = compiler;
    }
    generateSignal(marketState) {
        const best = this.compiler.getBestStrategies();
        if (best.length === 0) {
            return {
                direction: "BUY",
                confidence: 0.5,
                strategyId: "default"
            };
        }
        const top = best[0];
        const signal = {
            strategyId: top.id,
            direction: marketState.trend === "UP" ? "BUY" : "SELL",
            confidence: Math.min(0.99, top.successRate + top.expectedEdge),
        };
        return signal;
    }
}
exports.StrategyEngine = StrategyEngine;
