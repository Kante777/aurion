export const normalizeTestEvidence = (evidence: any[]) =>
  evidence.map(e => ({
    detector: e.detector ?? "unknown",
    score: e.score ?? e.normalizedScore ?? 0,
    confidence: e.confidence ?? 0.5
  }));
