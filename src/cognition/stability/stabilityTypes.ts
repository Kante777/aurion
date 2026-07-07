
export interface StabilityViolation {
  moduleA: string;
  moduleB: string;
  conflictType: string;
  severity: number;
}

export interface StabilityReport {
  stable: boolean;
  violations: StabilityViolation[];
  coherenceScore: number;
}

export interface StabilityAction {
  target: string;
  action: string;
}
