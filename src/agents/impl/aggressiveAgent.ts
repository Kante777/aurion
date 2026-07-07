import { BaseAgent } from "../baseAgent";
import { AgentDecision } from "../../engine/decision/decisionTypes";

export class AggressiveAgent extends BaseAgent {

  decide(state: any): AgentDecision {

    const confidence = state.belief?.confidence || 0.5;

    return {
      agentId: this.id,
      bias: confidence > 0.55 ? "BUY" : "SELL",
      confidence: confidence + 0.1,
      reasoning: [
        "Momentum-first reasoning",
        "Early entry bias",
        "Lower confirmation threshold"
      ]
    };
  }
}
