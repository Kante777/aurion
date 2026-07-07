import { EventBus } from "../../core/bus/eventBus";
import { TradeOutcome } from "./learningTypes";

export class LearningEngine {
  private outcomes: Map<string, TradeOutcome> = new Map();

  private patternStats: Map<string, any> = new Map();

  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("TRADE_OUTCOME_RECORDED", (outcome: TradeOutcome) => {
      this.processOutcome(outcome);
    });

    this.bus.on("EXECUTION_CANDIDATE_CREATED", (exec: any) => {
      this.trackExecution(exec);
    });
  }

  private trackExecution(exec: any) {
    // store for future matching with outcome
    this.outcomes.set(exec.id, {
      id: exec.id,
      instrument: exec.instrument,
      executionId: exec.id,
      outcome: "INVALIDATED",
      profitLoss: 0,
      maxFavorableExcursion: 0,
      maxAdverseExcursion: 0,
      duration: 0,
      timestamp: Date.now(),
    });
  }

  private processOutcome(outcome: TradeOutcome) {
    this.outcomes.set(outcome.executionId, outcome);

    this.updatePatternMemory(outcome);

    this.updateBeliefMemory(outcome);

    this.bus.emit("LEARNING_UPDATED", outcome);
  }

  // =========================
  // PATTERN MEMORY
  // =========================

  private updatePatternMemory(outcome: TradeOutcome) {
    const key = outcome.instrument;

    const existing = this.patternStats.get(key) || {
      wins: 0,
      losses: 0,
      total: 0,
    };

    existing.total += 1;

    if (outcome.outcome === "TP_HIT") {
      existing.wins += 1;
    } else if (outcome.outcome === "SL_HIT") {
      existing.losses += 1;
    }

    this.patternStats.set(key, existing);
  }

  // =========================
  // BELIEF MEMORY
  // =========================

  private updateBeliefMemory(outcome: TradeOutcome) {
    const reliabilityScore =
      outcome.outcome === "TP_HIT"
        ? 1
        : outcome.outcome === "SL_HIT"
        ? 0
        : 0.5;

    // emit adjustment signal for Belief Engine
    this.bus.emit("BELIEF_REINFORCEMENT", {
      instrument: outcome.instrument,
      adjustment: reliabilityScore,
    });
  }

  getStats(instrument: string) {
    return this.patternStats.get(instrument);
  }
}
