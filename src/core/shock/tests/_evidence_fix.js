"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTestEvidence = void 0;
const normalizeTestEvidence = (evidence) => evidence.map(e => ({
    detector: e.detector ?? "unknown",
    score: e.score ?? e.normalizedScore ?? 0,
    confidence: e.confidence ?? 0.5
}));
exports.normalizeTestEvidence = normalizeTestEvidence;
