import { BeliefState } from "../fusion/fusionTypes";

export interface TradeOpportunity {
  instrument: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  strength: number;
  riskScore: number;
  reasoning: string[];
  belief: BeliefState;
}

export interface RankedDecision {
  top: TradeOpportunity[];
  timestamp: number;
}
