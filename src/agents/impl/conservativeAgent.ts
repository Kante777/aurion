import { BaseAgent } from "../baseAgent";
import { AgentDecision } from "../../engine/decision/decisionTypes";

export class ConservativeAgent extends BaseAgent {

  decide(state: any): AgentDecision {

    const confidence = state.belief?.confidence || 0.5;

    return {
      agentId: this.id,
      bias: confidence > 0.7 ? "BUY" : "HOLD",
      confidence: confidence * 0.8,
      reasoning: [
        "Needs structural alignment",
        "Avoids premature entries",
        "Prefers confirmation clusters"
      ]
    };
  }
}
