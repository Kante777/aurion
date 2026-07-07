import { TradeOpportunity } from "../decision/decisionTypes";

export interface PortfolioPosition {
  instrument: string;
  weight: number;
  adjustedConfidence: number;
  riskContribution: number;
  reason: string[];
}

export interface PortfolioDecision {
  positions: PortfolioPosition[];
  totalRisk: number;
  timestamp: number;
}
