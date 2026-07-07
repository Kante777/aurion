
export interface StressEvent {
  type: string;
  stabilityImpact: number;
  executionImpact: number;
  sovereigntyImpact: number;
}

export interface AdaptationSignal {
  module: string;
  adjustment: number;
  reason: string;
}

export interface EvolutionState {
  version: number;
  stabilityWeight: number;
  executionWeight: number;
  reasoningWeight: number;
}
