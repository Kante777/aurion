export interface AgentDecision {
  agentId: string;
  bias: "BUY" | "SELL" | "HOLD";
  confidence: number;
  reasoning: string[];
}

export interface FinalDecision {
  instrument: string;

  action: "BUY" | "SELL" | "HOLD";

  confidence: number;

  contributors: string[];

  rationale: string[];
}
