export type EvidencePoint = {
  detector: string;
  score: number;
  confidence: number;
};

// 🧠 Flexible input accepted everywhere in system
export type RawEvidence =
  | EvidencePoint
  | {
      detector?: string;
      score?: number;
      normalizedScore?: number;
      confidence?: number;
    }
  | {
      detector?: string;
      score?: number;
    };
