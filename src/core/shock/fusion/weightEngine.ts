import { WeightedEvidence } from "./types";

export class WeightEngine {

    private baseWeights: Record<string, number> = {
        volatility_detector: 1.2,
        liquidity_detector: 1.4,
        spread_detector: 1.1,
        correlation_detector: 1.3,
        news_detector: 1.5,
        session_detector: 0.9
    };

    computeWeight(detector: string, confidence: number): number {

        const base = this.baseWeights[detector] ?? 1.0;

        // confidence amplifies or reduces importance
        return base * (0.5 + confidence / 2);
    }

    normalize(weights: WeightedEvidence[]): WeightedEvidence[] {

        const total = weights.reduce((sum, w) => sum + w.weight, 0);

        return weights.map(w => ({
            ...w,
            weight: w.weight / total
        }));
    }
}
