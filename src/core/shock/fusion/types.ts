export interface WeightedEvidence {
    detector: string;
    score: number;        // normalized 0–1
    confidence: number;   // 0–1
    weight: number;       // learned importance
}

export interface FusionResult {
    shockScore: number;      // 0–1 unified pressure
    state: "CALM" | "ACTIVE" | "CRITICAL";
    contributions: WeightedEvidence[];
}
