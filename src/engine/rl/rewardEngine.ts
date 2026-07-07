import { EventBus } from "../../core/bus/eventBus";
import { RewardSignal } from "./rewardTypes";

export class RewardEngine {

  constructor(private bus: EventBus) {}

  evaluateTrade(outcome: any): RewardSignal {

    let reward = 0;

    if (outcome.outcome === "TP_HIT") reward = 1;
    if (outcome.outcome === "SL_HIT") reward = -1;
    if (outcome.outcome === "BREAKEVEN") reward = 0;

    const signal: RewardSignal = {
      id: crypto.randomUUID(),
      source: "TRADE",
      instrument: outcome.instrument,
      reward,
      confidence: outcome.confidence || 0.5,
      timestamp: Date.now()
    };

    this.bus.emit("REWARD_SIGNAL", signal);

    return signal;
  }
}
