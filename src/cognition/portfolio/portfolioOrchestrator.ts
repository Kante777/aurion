import { DecisionOrchestrator } from "../decision/decisionOrchestrator";
import { PortfolioEngine } from "./portfolioEngine";
import { PortfolioRiskEngine } from "./portfolioRiskEngine";
import { PortfolioDecision } from "./portfolioTypes";

export class PortfolioOrchestrator {

  constructor(
    private decision: DecisionOrchestrator,
    private allocator: PortfolioEngine,
    private riskEngine: PortfolioRiskEngine
  ) {}

  run(): PortfolioDecision {

    const ranked = this.decision.run().top;

    const positions = this.allocator.allocate(ranked);

    const risk = this.riskEngine.computeRisk(positions);

    return {
      positions,
      totalRisk: risk,
      timestamp: Date.now()
    };
  }
}
