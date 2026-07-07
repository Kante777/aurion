"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEvidence = normalizeEvidence;
function normalizeEvidence(evidence) {
    return evidence.map(e => ({
        detector: e.detector ?? "unknown",
        score: e.score ?? e.normalizedScore ?? 0,
        confidence: e.confidence ?? 0.5
    }));
}
