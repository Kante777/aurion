export interface ShockPattern {
    name: string;
    vector: number[];
    outcome: "REVERSAL" | "CONTINUATION" | "CRASH";
}

export class ShockPatternRegistry {

    private patterns: ShockPattern[] = [
        {
            name: "liquidity_squeeze_break",
            vector: [0.6, 0.5, 0.4],
            outcome: "CRASH"
        },
        {
            name: "volatility_expansion_retest",
            vector: [0.5, 0.3, 0.2],
            outcome: "REVERSAL"
        },
        {
            name: "correlation_decoupling",
            vector: [0.4, 0.6, 0.5],
            outcome: "CONTINUATION"
        }
    ];

    getPatterns() {
        return this.patterns;
    }
}
