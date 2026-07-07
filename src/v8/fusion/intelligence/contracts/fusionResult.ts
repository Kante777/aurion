export interface FusionResult {
  score: number;
  confidence: number;
  contradictions: number;
  evidenceCount: number;

  classification:
    | "HIGH_CONVICTION"
    | "MODERATE"
    | "LOW_CONFIDENCE"
    | "REJECT";

  decisionReady: boolean;

  timestamp: number;
}
