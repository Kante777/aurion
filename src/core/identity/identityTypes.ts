
export interface IdentityState {
  version: number;
  coherence: number;
  memoryStrength: number;
  stabilityScore: number;
  evolutionPressure: number;
}

export interface IdentitySnapshot {
  timestamp: number;
  state: IdentityState;
  driftDetected: boolean;
}

export interface IdentityUpdate {
  coherenceDelta: number;
  reason: string;
}
