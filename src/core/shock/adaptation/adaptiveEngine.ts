export class AdaptiveEngine {

    private weights: Record<string, number> = {};
    private history: number[] = [];

    update(sample: any) {
        const error = sample?.error ?? 0;

        this.history.push(error);

        const avgError =
            this.history.reduce((a, b) => a + b, 0) /
            this.history.length;

        // simple adaptation rule
        this.weights["global"] = Math.max(0.1, 1 - avgError);

        return {
            updated: true,
            error,
            avgError
        };
    }

    getWeights() {
        return this.weights;
    }
}