
import { FusionEngine } from "./fusionEngine";

export class FusionOrchestrator {

  constructor(
    private engine: FusionEngine,
    private inputs: any
  ) {}

  run() {

    const decision = this.engine.fuse(this.inputs);

    return {
      timestamp: Date.now(),
      decision,
      summary:
        `Market=${decision.marketState}, Risk=${decision.riskLevel.toFixed(2)}, Signal=${decision.dominantSignal}`
    };
  }
}
