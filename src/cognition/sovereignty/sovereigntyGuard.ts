
import { SovereigntyCore } from "./sovereigntyCore";

export class SovereigntyGuard {

  constructor(private core: SovereigntyCore) {}

  enforce(systemIntent: string) {

    const locked = this.core.lockDecision(systemIntent);

    return {
      timestamp: Date.now(),
      locked,
      status: "SOVEREIGN_INTENT_LOCKED"
    };
  }

  validateOverride(source: string, reason: string) {

    return this.core.attemptOverride(source, reason);
  }

  report() {
    return this.core.getReport();
  }
}
