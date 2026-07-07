import { ShockEvidence } from "./ShockEvidence";

export function normalizeEvidence(e: any): ShockEvidence {
  return {
    detector: e.detector,
    metric: e.metric ?? "signal",
    rawValue: e.rawValue ?? e.score ?? 0,
    normalizedScore: e.normalizedScore ?? e.score ?? 0,
    confidence: e.confidence ?? 0,
    explanation: e.explanation ?? "",
    timestamp: e.timestamp ?? Date.now(),
    metadata: e.metadata ?? {}
  };
}
