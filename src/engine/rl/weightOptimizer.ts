import { EventBus } from "../../core/bus/eventBus";
import { RewardSignal, WeightUpdate } from "./rewardTypes";

export class WeightOptimizer {

  private weights: Map<string, number> = new Map();

  constructor(private bus: EventBus) {
    this.attach();
  }

  private attach() {
    this.bus.on("REWARD_SIGNAL", (signal: RewardSignal) => {
      this.adjust(signal);
    });
  }

  private adjust(signal: RewardSignal) {

    const key = signal.instrument;

    const current = this.weights.get(key) || 0.5;

    const learningRate = 0.1;

    const delta = signal.reward * learningRate;

    const updated = this.clamp(current + delta);

    this.weights.set(key, updated);

    const update: WeightUpdate = {
      target: key,
      currentWeight: current,
      adjustedWeight: updated,
      delta
    };

    this.bus.emit("WEIGHT_UPDATED", update);
  }

  private clamp(value: number) {
    return Math.max(0, Math.min(1, value));
  }

  getWeight(key: string) {
    return this.weights.get(key) || 0.5;
  }
}
