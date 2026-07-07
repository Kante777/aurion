import { BeliefStore } from "../fusion/beliefStore";
import { DecisionEngine } from "./decisionEngine";
import { DecisionRanker } from "./decisionRanker";
import { RankedDecision } from "./decisionTypes";

export class DecisionOrchestrator {

  constructor(
    private beliefs: BeliefStore,
    private engine: DecisionEngine,
    private ranker: DecisionRanker
  ) {}

  run(): RankedDecision {

    const all = this.beliefs.getAll();

    const opportunities = all.map(b => this.engine.generate(b));

    const ranked = this.ranker.rank(opportunities);

    return {
      top: ranked.slice(0, 5),
      timestamp: Date.now()
    };
  }
}
