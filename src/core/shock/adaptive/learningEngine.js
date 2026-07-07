"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningEngine = void 0;
class LearningEngine {
    lr = 0.15;
    computeEffectiveError(record, now) {
        const age = (now - record.timestamp) / 100000;
        const recencyWeight = Math.exp(-age);
        return record.error * record.confidence * recencyWeight;
    }
    updateWeights(weights, memory, now) {
        const updated = { ...weights };
        for (const record of memory) {
            const effError = this.computeEffectiveError(record, now);
            for (const key in updated) {
                updated[key] *= (1 - this.lr * effError);
            }
        }
        return updated;
    }
}
exports.LearningEngine = LearningEngine;
