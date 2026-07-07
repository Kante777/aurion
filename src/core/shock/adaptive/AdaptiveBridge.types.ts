export type State = "STABLE" | "ACTIVE" | "VOLATILE";

export interface EvidencePoint {
  detector: string;
  score: number;
  confidence: number;
}

export interface FusionResult {
  shockScore: number;
  state: State;
  contributions: any[];
}

export interface LearningResult {
  error: number;
  updatedWeights: Record<string, number>;
  memorySize: number;
}

export interface AdaptiveBridge {
  fuse(evidence: EvidencePoint[]): FusionResult;

  applyOutcome(
    state: State,
    evidence: EvidencePoint[],
    result: FusionResult
  ): LearningResult;

  getWeights(): Record<string, number>;
}
