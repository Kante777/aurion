import { ShockDetector } from "../interfaces/ShockDetector";
import { ShockEvidence } from "../interfaces/ShockEvidence";

export class SpreadDetector implements ShockDetector<any> {

    readonly name = "spread_detector";

    detect(input: any): ShockEvidence | null {

        const spread = input?.spread ?? 0;
        const avgSpread = input?.avgSpread ?? 0.0001;

        if (avgSpread === 0) return null;

        const expansion = spread / avgSpread;

        const score = Math.min(1, (expansion - 1) / 5);

        if (score < 0.05) return null;

        return {
            detector: this.name,
            metric: "spread",
            rawValue: spread,
            normalizedScore: score,
            confidence: 0.78,
            explanation: `Spread expansion detected (${expansion.toFixed(2)}x average)`,
            timestamp: Date.now()
        };
    }
}
