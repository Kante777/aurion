
import { BehavioralEngine } from "./behavioralEngine";

export class BehavioralMonitor {

  constructor(private engine: BehavioralEngine) {}

  run() {

    const fingerprint = this.engine.classifyMarket();

    return {
      timestamp: Date.now(),
      fingerprint,
      alert:
        fingerprint.regime === "PRE_BREAKOUT"
          ? "BREAKOUT_WARNING"
          : fingerprint.regime === "FAKE_STABLE"
          ? "LIQUIDITY_TRAP_RISK"
          : "NORMAL_CONDITIONS"
    };
  }
}
