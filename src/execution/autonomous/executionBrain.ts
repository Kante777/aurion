
import { ExecutionEngine } from "./executionEngine";
import { TradeIntent } from "./executionTypes";

export class ExecutionBrain {

  constructor(private engine: ExecutionEngine) {}

  act(decision: any) {

    const intent: TradeIntent = {
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
      status:
        result.executed
          ? "TRADE_EXECUTED"
          : "TRADE_BLOCKED"
    };
  }
}
