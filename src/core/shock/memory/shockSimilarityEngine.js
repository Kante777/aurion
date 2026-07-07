"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockSimilarityEngine = void 0;
class ShockSimilarityEngine {
    similarity(a, b) {
        if (a.length !== b.length)
            return 0;
        let dot = 0;
        let magA = 0;
        let magB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            magA += a[i] * a[i];
            magB += b[i] * b[i];
        }
        const denom = Math.sqrt(magA) * Math.sqrt(magB);
        if (denom === 0)
            return 0;
        return dot / denom;
    }
}
exports.ShockSimilarityEngine = ShockSimilarityEngine;
