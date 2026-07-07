
import { HealingEngine } from "./healingEngine";

export class HealingMonitor {

  constructor(private engine: HealingEngine) {}

  run(systemSnapshot: any) {

    const health = this.engine.runHealingCycle(systemSnapshot);

    return {
      timestamp: Date.now(),
      health,
      status:
        health.overallHealth > 0.8
          ? "HEALTHY"
          : health.overallHealth > 0.5
          ? "DEGRADED"
          : "CRITICAL_REPAIR_MODE"
    };
  }
}
