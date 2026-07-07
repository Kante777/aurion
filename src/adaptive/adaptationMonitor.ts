
import { AdaptiveEngine } from "./adaptiveEngine";

export class AdaptationMonitor {

  constructor(private engine: AdaptiveEngine) {}

  run(stressEvents: any[]) {

    const result = this.engine.processStress(stressEvents);

    const stability =
      (result.state.stabilityWeight +
        result.state.executionWeight +
        result.state.reasoningWeight) / 3;

    return {
      timestamp: Date.now(),
      evolution: result.state,
      signals: result.signals,
      status:
        stability > 1.2
          ? "OVERFITTING_RISK"
          : stability > 1
          ? "EVOLVING_STABLE"
          : "UNDERPOWERED"
    };
  }
}
