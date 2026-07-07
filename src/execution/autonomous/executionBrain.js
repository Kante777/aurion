"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionBrain = void 0;
class ExecutionBrain {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    act(decision) {
        const intent = {
            instrument: "EURUSD",
            direction: decision.dominantSignal.includes("BUY")
                ? "BUY"
                : "SELL",
            confidence: decision.confidence,
            riskLevel: decision.riskLevel,
            reason: decision.marketState
        };
        const result = this.engine.execute(intent);
        return {
            timestamp: Date.now(),
            intent,
            result,
            status: result.executed
                ? "TRADE_EXECUTED"
                : "TRADE_BLOCKED"
        };
    }
}
exports.ExecutionBrain = ExecutionBrain;
