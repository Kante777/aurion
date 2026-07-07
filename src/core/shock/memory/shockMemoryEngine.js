"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockMemoryEngine = void 0;
const shockMemoryStore_1 = require("./shockMemoryStore");
const shockFingerprintEngine_1 = require("./shockFingerprintEngine");
const shockSimilarityEngine_1 = require("./shockSimilarityEngine");
const shockPatternRegistry_1 = require("./shockPatternRegistry");
class ShockMemoryEngine {
    store = new shockMemoryStore_1.ShockMemoryStore();
    fingerprint = new shockFingerprintEngine_1.ShockFingerprintEngine();
    similarity = new shockSimilarityEngine_1.ShockSimilarityEngine();
    registry = new shockPatternRegistry_1.ShockPatternRegistry();
    process(snapshot) {
        // 🧠 store snapshot
        this.store.add(snapshot);
        const fp = this.fingerprint.compute(snapshot);
        let bestMatch = {
            pattern: null,
            score: 0
        };
        // 🔍 compare with known patterns
        for (const pattern of this.registry.getPatterns()) {
            const score = this.similarity.similarity(fp.vector, pattern.vector);
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
exports.ShockMemoryEngine = ShockMemoryEngine;
