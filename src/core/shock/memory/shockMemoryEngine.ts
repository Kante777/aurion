import { ShockMemoryStore } from "./shockMemoryStore";
import { ShockFingerprintEngine } from "./shockFingerprintEngine";
import { ShockSimilarityEngine } from "./shockSimilarityEngine";
import { ShockPatternRegistry } from "./shockPatternRegistry";

export class ShockMemoryEngine {

    private store = new ShockMemoryStore();
    private fingerprint = new ShockFingerprintEngine();
    private similarity = new ShockSimilarityEngine();
    private registry = new ShockPatternRegistry();

    process(snapshot: any) {

        // 🧠 store snapshot
        this.store.add(snapshot);

        const fp = this.fingerprint.compute(snapshot);

        let bestMatch = {
            pattern: null as any,
            score: 0
        };

        // 🔍 compare with known patterns
        for (const pattern of this.registry.getPatterns()) {

            const score = this.similarity.similarity(
                fp.vector,
                pattern.vector
            );

            if (score > bestMatch.score) {
                bestMatch = {
                    pattern,
                    score
                };
            }
        }

        return {
            fingerprint: fp,
            memorySimilarity: bestMatch.score,
            closestPattern: bestMatch.pattern?.name ?? "unknown",
            predictedOutcome: bestMatch.pattern?.outcome ?? "UNKNOWN"
        };
    }
}
