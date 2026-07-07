
export interface SovereignDecision {
  id: string;
  intent: string;
  locked: boolean;
  timestamp: number;
}

export interface OverrideAttempt {
  source: string;
  reason: string;
  severity: number;
}

export interface SovereigntyReport {
  integrityScore: number;
  lockedDecisions: SovereignDecision[];
  overrideAttempts: OverrideAttempt[];
}
