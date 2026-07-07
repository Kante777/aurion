import { BeliefState } from "../fusion/fusionTypes";
import { TradeOpportunity } from "./decisionTypes";

export class DecisionEngine {

  private normalizeConfidence(x: number): number {
    return Math.max(0, Math.min(1, (x + 2) / 4));
  }

  private riskScore(belief: BeliefState): number {
    const contradictionPenalty =
      belief.contradictingEvidence.length * 0.1;

    const volatilityProxy = Math.abs(belief.strength) * 0.5;

    return Math.min(1, contradictionPenalty + volatilityProxy);
  }

  generate(belief: BeliefState): TradeOpportunity {

    const confidence = this.normalizeConfidence(belief.strength);

    const risk = this.riskScore(belief);

    const action =
      belief.direction === "NEUTRAL"
        ? "HOLD"
        : belief.direction;

    return {
      instrument: belief.instrument,
      action,
      confidence,
      strength: belief.strength,
      riskScore: risk,
      belief,
      reasoning: [
        "Derived from fused evidence state",
        `Supporting evidence: ${belief.supportingEvidence.length}`,
        `Contradictions: ${belief.contradictingEvidence.length}`,
        `Market direction: ${belief.direction}`
      ]
    };
  }
}
