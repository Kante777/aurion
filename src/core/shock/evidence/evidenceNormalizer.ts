export class EvidenceNormalizer {

    /**
     * Converts raw detector values into 0–1 scale
     * deterministic + bounded + stable
     */
    normalize(value: number, min: number, max: number): number {
        if (max === min) return 0;

        const clamped = Math.min(Math.max(value, min), max);
        return (clamped - min) / (max - min);
    }

    /**
     * Soft sigmoid fallback for unstable market distributions
     */
    sigmoidNormalize(x: number): number {
        return 1 / (1 + Math.exp(-x));
    }

    /**
     * Ensures final bounds safety
     */
    clamp01(value: number): number {
        return Math.min(1, Math.max(0, value));
    }
}
