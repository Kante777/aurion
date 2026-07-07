import { ShockDetector } from "../interfaces/ShockDetector";
import { ShockEvidence } from "../interfaces/ShockEvidence";

export class NewsDetector implements ShockDetector<any> {

    readonly name = "news_detector";

    detect(input: any): ShockEvidence | null {

        const event = input?.newsEvent;

        if (!event) return null;

        const impact = event.impact ?? "LOW";

        let score = 0;

        switch (impact) {
            case "HIGH":
                score = 1;
                break;
            case "MEDIUM":
                score = 0.6;
                break;
            case "LOW":
                score = 0.2;
                break;
        }

        return {
            detector: this.name,
            metric: "macro_news",
            rawValue: score,
            normalizedScore: score,
            confidence: 0.9,
            explanation: `Macro event detected: ${event.type ?? "UNKNOWN"} (${impact})`,
            timestamp: Date.now(),
            metadata: event
        };
    }
}
