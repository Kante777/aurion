import { TradeOpportunity } from "../decision/decisionTypes";
import { PortfolioPosition } from "./portfolioTypes";

export class PortfolioEngine {

  private correlationPenalty(a: TradeOpportunity, b: TradeOpportunity): number {
    // simple systemic overlap penalty
    if (a.instrument === b.instrument) return 1;

    const sharedRisk =
      (a.belief.contradictingEvidence.length +
       b.belief.contradictingEvidence.length) / 10;

    return Math.min(1, sharedRisk);
  }

  allocate(opportunities: TradeOpportunity[]): PortfolioPosition[] {

    const total = opportunities.length;

    return opportunities.map((o, i) => {

      const baseWeight = o.confidence * (1 - o.riskScore);

      const crossPenalty = opportunities
        .filter((_, j) => i !== j)
        .reduce((acc, other) => {
          return acc + this.correlationPenalty(o, other);
        }, 0) / total;

      const adjustedWeight = baseWeight * (1 - crossPenalty);

      return {
        instrument: o.instrument,
        weight: adjustedWeight,
        adjustedConfidence: o.confidence,
        riskContribution: o.riskScore,
        reason: [
          "Confidence-weighted allocation",
          "Risk-adjusted portfolio scaling",
          "Cross-asset correlation penalty applied"
        ]
      };
    });
  }
}
