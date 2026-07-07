"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyCompiler = void 0;
class StrategyCompiler {
    strategies = [];
    compileFromHistory(history) {
        const map = new Map();
        for (const h of history) {
            if (!map.has(h.strategyId)) {
                map.set(h.strategyId, {
                    id: h.strategyId,
                    name: `strategy_${h.strategyId}`,
                    conditions: ["market_momentum", "liquidity_check"],
                    riskProfile: Math.random(),
                    expectedEdge: 0,
                    usageCount: 0,
                    successRate: 0
                });
            }
            const s = map.get(h.strategyId);
            s.usageCount += 1;
            if (h.win)
                s.successRate += 1;
            s.expectedEdge += h.pnl;
        }
        const compiled = Array.from(map.values()).map(s => {
            s.successRate = s.successRate / Math.max(1, s.usageCount);
            s.expectedEdge = s.expectedEdge / Math.max(1, s.usageCount);
            return s;
        });
        this.strategies = compiled;
        return compiled;
    }
    getBestStrategies(limit = 3) {
        return this.strategies
            .sort((a, b) => b.successRate + b.expectedEdge - (a.successRate + a.expectedEdge))
            .slice(0, limit);
    }
}
exports.StrategyCompiler = StrategyCompiler;
