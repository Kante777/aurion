import { ShockDetector } from "../interfaces/ShockDetector";
import { ShockEvidence } from "../interfaces/ShockEvidence";

export class CorrelationDetector implements ShockDetector<any> {

    readonly name = "correlation_detector";

    detect(input: any): ShockEvidence | null {

        const correlations = input?.correlations;

        if (!correlations || correlations.length === 0) return null;

        let totalDeviation = 0;
        let count = 0;

        for (const pair of correlations) {
            const expected = pair.expected ?? 1;
            const actual = pair.actual ?? 1;

            totalDeviation += Math.abs(expected - actual);
            count++;
        }

        const avgDeviation = count === 0 ? 0 : totalDeviation / count;

        const score = Math.min(1, avgDeviation);

        if (score < 0.05) return null;

        return {
            detector: this.name,
            metric: "correlation_breakdown",
            rawValue: avgDeviation,
            normalizedScore: score,
            confidence: 0.82,
            explanation: `Correlation deviation detected across ${count} pairs`,
            timestamp: Date.now()
        };
    }
}
