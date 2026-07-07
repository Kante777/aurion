import { ShockDetector } from "../interfaces/ShockDetector";
import { ShockEvidence } from "../interfaces/ShockEvidence";

export class LiquidityDetector implements ShockDetector<any> {

    readonly name = "liquidity_detector";

    detect(input: any): ShockEvidence | null {

        const depth = input?.liquidityDepth ?? 1;
        const imbalance = input?.orderImbalance ?? 0;

        const score = Math.min(1,
            (1 - depth) * 0.7 +
            Math.abs(imbalance) * 0.3
        );

        if (score < 0.1) return null;

        return {
            detector: this.name,
            metric: "liquidity",
            rawValue: depth,
            normalizedScore: score,
            confidence: 0.80,
            explanation: `Liquidity stress detected (depth=${depth}, imbalance=${imbalance})`,
            timestamp: Date.now()
        };
    }
}
