
import { TradeIntent, Position, ExecutionResult } from "./executionTypes";

export class ExecutionEngine {

  private positions: Position[] = [];

  execute(intent: TradeIntent): ExecutionResult {


    if (intent.riskLevel > 0.8) {
      return {
        executed: false,
        reason: "RISK_TOO_HIGH"
      };
    }

    if (intent.confidence < 0.55) {
      return {
        executed: false,
        reason: "LOW_CONFIDENCE"
      };
    }


    const size =
      intent.confidence * (1 - intent.riskLevel) * 1000;

    const position: Position = {
      id: `pos_${Date.now()}`,
      instrument: intent.instrument,
      direction: intent.direction,
      size,
      entryPrice: this.mockPrice(intent.instrument),
      status: "OPEN"
    };

    this.positions.push(position);

    return {
      executed: true,
      position,
      slippage: Math.random() * 0.0005
    };
  }

  close(positionId: string): boolean {

    const pos = this.positions.find(p => p.id === positionId);

    if (!pos) return false;

    pos.status = "CLOSED";
    return true;
  }

  getPositions(): Position[] {
    return this.positions;
  }

  private mockPrice(instrument: string): number {
    const base =
      instrument === "EURUSD" ? 1.1 :
      instrument === "GBPUSD" ? 1.3 :
      instrument === "XAUUSD" ? 2000 :
      100;

    return base + (Math.random() - 0.5) * 0.01;
  }
}
