export class ShockAdaptiveWeightEngine {

    private weights: Record<string, number> = {
        volatility_detector: 1.0,
        liquidity_detector: 1.0,
        spread_detector: 1.0,
        correlation_detector: 1.0,
        news_detector: 1.0,
        session_detector: 1.0
    };

    adapt(calibration: {
        overestimate: number,
        underestimate: number,
        accuracy: number
    }) {

        const { overestimate, underestimate, accuracy } = calibration;

        const learningRate = 0.05;

        // 🧠 If system overestimates risk → reduce sensitivity
        if (overestimate > underestimate) {
            for (const key of Object.keys(this.weights)) {
                this.weights[key] *= (1 - learningRate);
            }
        }

        // 🧠 If system underestimates risk → increase sensitivity
        if (underestimate > overestimate) {
            for (const key of Object.keys(this.weights)) {
                this.weights[key] *= (1 + learningRate);
            }
        }

        // 🧠 stabilize bounds
        for (const key of Object.keys(this.weights)) {
            this.weights[key] = Math.max(0.5, Math.min(2.0, this.weights[key]));
        }

        return {
            updatedWeights: this.weights,
            systemAccuracy: accuracy
        };
    }

    getWeights() {
        return this.weights;
    }
}
