export interface ShockEvidence {
    detector: string;
    metric: string;

    rawValue: number;
    normalizedScore: number;   // 0–1 unified scale

    confidence: number;        // detector confidence 0–1

    explanation: string;

    timestamp: number;

    metadata?: Record<string, unknown>;
}
