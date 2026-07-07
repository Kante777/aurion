
import { ShockDetector } from "./shockDetector";

export class ShockEngine {

  constructor(private detector: ShockDetector) {}

  run() {

    const stress = this.detector.computeStress();

    return {
      timestamp: Date.now(),
      systemStress: stress,
      alert:
        stress.level === "CRITICAL"
          ? "SYSTEM_UNSTABLE"
          : stress.level === "HIGH"
          ? "ELEVATED_RISK"
          : "STABLE"
    };
  }
}
