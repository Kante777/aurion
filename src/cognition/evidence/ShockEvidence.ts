export interface ShockEvidence {
  detector: string;
  metric: string;

  rawValue: number;
  normalizedScore: number;

  confidence: number;

  explanation: string;

  timestamp: number;

  metadata?: Record<string, unknown>;
}
