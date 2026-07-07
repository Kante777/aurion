import { TradeOpportunity } from "./decisionTypes";

export class DecisionRanker {

  rank(opportunities: TradeOpportunity[]): TradeOpportunity[] {
    return opportunities
      .filter(o => o.action !== "HOLD")
      .sort((a, b) => {

        const scoreA = a.confidence * (1 - a.riskScore);
        const scoreB = b.confidence * (1 - b.riskScore);

        return scoreB - scoreA;
      });
  }
}
