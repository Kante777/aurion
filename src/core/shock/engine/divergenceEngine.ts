export class DivergenceEngine {

    compute(evidence: any[]): number {

        if (!evidence.length) return 0;

        const scores = evidence.map(e => e.score);

        const mean =
            scores.reduce((a, b) => a + b, 0) / scores.length;

        const variance =
            scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0)
            / scores.length;

        // normalize 0–1
        return Math.min(1, variance * 4);
    }
}
