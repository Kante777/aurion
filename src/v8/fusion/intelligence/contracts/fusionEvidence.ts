import { CognitivePhase } from "../../../contracts/cognition";

export interface FusionEvidence {
  phase: CognitivePhase;
  source: string;
  confidence: number;
  strength: number;
  payload: unknown;
  timestamp: number;
}
