import { DecisionAggregator } from "./decisionAggregator";

export class DecisionEngine {

  private aggregator = new DecisionAggregator();

  run(instrument: string, agentDecisions: any[]) {

    return this.aggregator.aggregate(instrument, agentDecisions);
  }
}
