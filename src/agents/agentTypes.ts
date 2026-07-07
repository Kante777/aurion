export type Bias = "BUY" | "SELL" | "HOLD";

export interface AgentOpinion {
  agentId: string;
  name: string;

  bias: Bias;
  confidence: number;

  reasoning: string[];

  strengthMap: {
    trend: number;
    liquidity: number;
    structure: number;
    volatility: number;
  };
}
