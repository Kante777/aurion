import { TemporalLearningEngine } from "../temporal/learning/temporalLearningEngine";
import { FeedbackEngine } from "../feedback/feedbackEngine";
import { ReinforcementEngine } from "../reinforcement/reinforcementEngine";
import { RegimeMemoryEngine } from "../regime/regimeMemoryEngine";
import { CausalEngine } from "../causal/causalEngine";

export class AurionRuntime {
  constructor(
    private temporal = new TemporalLearningEngine(),
    private feedback = new FeedbackEngine(),
    private regime = new RegimeMemoryEngine(),
    private reinforcement = new ReinforcementEngine(
      feedback as any,
      {} as any,
      temporal as any
    ),
    private causal = new CausalEngine()
  ) {}

  /**
   * MAIN PIPELINE
   */
  process(events: any[], outcome?: any) {
    // 1. log events
    for (const e of events) {
      this.temporal.logEvent(e);
      this.causal.log(e);
    }

    // 2. temporal learning
    this.temporal.learnFromEventFlow();

    // 3. causal graph update
    const causalGraph = this.causal.detectCausality();

    // 4. feedback loop
    let signal = null;

    if (outcome) {
      signal = this.feedback.generateLearningSignal(outcome);

      this.reinforcement.runCycle(outcome);

      // 🔥 regime learning update
      if (signal) {
        const regimeType =
          signal.adjustment < 0 ? "RISK_OFF" : "RISK_ON";

        this.regime.update(
          regimeType,
          signal.adjustment < 0
        );
      }
    }

    // 5. regime update (fallback logic)
    if (signal) {
      this.regime.update(
        "RISK_OFF",
        signal.adjustment < 0
      );
    }

    const structure =
      this.temporal.getMarketStructure?.() || [];

    const graph = this.causal.getGraph();

    return {
      structure,
      causalGraph: graph.edges,
      nodes: graph.nodes,
      regime: this.regime.snapshot(),
      signal,
    };
  }
}