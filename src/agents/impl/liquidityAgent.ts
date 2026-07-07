import { BaseAgent } from "../baseAgent";
import { AgentDecision } from "../../engine/decision/decisionTypes";

export class LiquidityAgent extends BaseAgent {

  decide(state: any): AgentDecision {

    const sweepDetected = state?.belief?.sweep || false;

    return {
      agentId: this.id,
      bias: sweepDetected ? "BUY" : "HOLD",
      confidence: sweepDetected ? 0.8 : 0.4,
      reasoning: [
        "Liquidity sweep detection logic",
        "Stop hunt behavior tracking",
        "Execution-side imbalance focus"
      ]
    };
  }
}
