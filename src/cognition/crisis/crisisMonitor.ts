
import { CrisisEngine } from "./crisisEngine";

export class CrisisMonitor {

  constructor(private engine: CrisisEngine) {}

  run() {

    const forecast = this.engine.forecastCrisis();

    return {
      timestamp: Date.now(),
      crisis: forecast,
      alert:
        forecast.probability > 0.7
          ? "CRISIS_IMMINENT"
          : forecast.probability > 0.4
          ? "SYSTEM_FRAGILE"
          : "STABLE_SYSTEM"
    };
  }
}
