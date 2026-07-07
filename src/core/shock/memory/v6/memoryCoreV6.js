"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCoreV6 = void 0;
const memoryBuffer_1 = require("./memoryBuffer");
const decayEngine_1 = require("./decayEngine");
class MemoryCoreV6 {
    buffer = new memoryBuffer_1.MemoryBuffer();
    decay = new decayEngine_1.DecayEngine();
    add(entry) {
        this.buffer.add(entry);
    }
    computeAdaptiveWeights(baseWeights) {
        const now = Date.now();
        const memory = this.buffer.getAll();
        const weightedErrors = memory.map(m => {
            const decay = this.decay.computeLearningWeight(m, now);
            return {
                ...m,
                weight: decay
            };
        });
        const totalWeight = weightedErrors.reduce((a, b) => a + b.weight, 0) || 1;
        const avgError = weightedErrors.reduce((sum, m) => sum + m.error * m.weight, 0) / totalWeight;
        const adjustment = 1 - avgError;
        const updated = {};
        const keys = Object.keys(baseWeights);
        for (const k of keys) {
            updated[k] = baseWeights[k] * adjustment;
        }
        // normalize
        const sum = Object.values(updated).reduce((a, b) => a + b, 0);
        for (const k of keys) {
            updated[k] = updated[k] / sum;
        }
        return {
            error: avgError,
            updatedWeights: updated,
            memorySize: memory.length
        };
    }
    getMemory() {
        return this.buffer.getAll();
    }
}
exports.MemoryCoreV6 = MemoryCoreV6;
