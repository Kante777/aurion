export type RegimeType = "RISK_ON" | "RISK_OFF" | "MIXED";

type RegimeProfile = {
  correlationBias: number;
  leadBias: number;
  volatilitySensitivity: number;
  accuracy: number;
  samples: number;
};

export class RegimeMemoryEngine {

  private memory = new Map<RegimeType, RegimeProfile>([
    ["RISK_ON", {
      correlationBias: 1.1,
      leadBias: 1.0,
      volatilitySensitivity: 0.8,
      accuracy: 0.5,
      samples: 0
    }],
    ["RISK_OFF", {
      correlationBias: 1.3,
      leadBias: 1.2,
      volatilitySensitivity: 1.2,
      accuracy: 0.5,
      samples: 0
    }],
    ["MIXED", {
      correlationBias: 1.0,
      leadBias: 1.0,
      volatilitySensitivity: 1.0,
      accuracy: 0.5,
      samples: 0
    }]
  ]);

  
  /**
   * Update regime-specific learning
   */
  update(regime: string, correct: boolean) {

  const state = this.memory[regime];

  state.samples += 1;

  if (correct) {
    state.accuracy = (state.accuracy * (state.samples - 1) + 1) / state.samples;
  } else {
    state.accuracy = (state.accuracy * (state.samples - 1)) / state.samples;
  }
}



  /**
   * Get regime profile
   */
  get(regime: RegimeType) {
    return this.memory.get(regime);
  }

  /**
   * Apply regime scaling
   */
  scale(regime: RegimeType, value: number, type: "correlation" | "lead") {

    const profile = this.memory.get(regime);
    if (!profile) return value;

    if (type === "correlation") {
      return value * profile.correlationBias;
    }

    return value * profile.leadBias;
  }

  private clamp(profile: RegimeProfile) {

    profile.correlationBias = Math.max(0.5, Math.min(1.8, profile.correlationBias));
    profile.leadBias = Math.max(0.5, Math.min(1.8, profile.leadBias));
    profile.volatilitySensitivity = Math.max(0.5, Math.min(2, profile.volatilitySensitivity));
  }

  /**
   * Debug view
   */
  snapshot() {
    return Object.fromEntries(this.memory.entries());
  }
}
