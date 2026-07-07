import { IdentityCore } from "./identityCore";

export class IdentityMonitor {
  constructor(private core: IdentityCore) {}

  runCycle(signal: any) {
    // 🔥 convert raw signal into identity impact
    const coherenceDelta =
      (signal.noise ?? 0.5) - 0.5; // centered signal

    const drift = this.core.detectDrift(signal);

    this.core.updateIdentity({
      coherenceDelta: drift ? -0.02 : coherenceDelta * 0.05,
      reason: drift ? "identity_drift" : "market_signal",
    });

    console.log("INPUT SIGNAL:", signal);

    const snapshot = this.core.snapshot();

    return {
      timestamp: Date.now(),
      identity: snapshot.state,
      driftDetected: snapshot.driftDetected,
      status:
        snapshot.state.coherence > 0.8
          ? "COHERENT_IDENTITY"
          : snapshot.state.coherence > 0.5
          ? "STABLE_BUT_ADJUSTING"
          : "FRAGMENTING_IDENTITY",
    };
  }
}