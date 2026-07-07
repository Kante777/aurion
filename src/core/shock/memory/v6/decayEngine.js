"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecayEngine = void 0;
class DecayEngine {
    computeDecay(entry, now) {
        const age = now - entry.timestamp;
        // exponential decay (half-life ~ stability bias)
        const lambda = 0.00001;
        return Math.exp(-lambda * age);
    }
    computeLearningWeight(entry, now) {
        const decay = this.computeDecay(entry, now);
        // confidence matters
        return decay * entry.confidence * (1 - entry.error);
    }
}
exports.DecayEngine = DecayEngine;
