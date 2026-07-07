"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceNormalizer = void 0;
class EvidenceNormalizer {
    /**
     * Converts raw detector values into 0–1 scale
     * deterministic + bounded + stable
     */
    normalize(value, min, max) {
        if (max === min)
            return 0;
        const clamped = Math.min(Math.max(value, min), max);
        return (clamped - min) / (max - min);
    }
    /**
     * Soft sigmoid fallback for unstable market distributions
     */
    sigmoidNormalize(x) {
        return 1 / (1 + Math.exp(-x));
    }
    /**
     * Ensures final bounds safety
     */
    clamp01(value) {
        return Math.min(1, Math.max(0, value));
    }
}
exports.EvidenceNormalizer = EvidenceNormalizer;
