import { MemoryBuffer } from "./memoryBuffer";
import { DecayEngine } from "./decayEngine";
import { MemoryEntry, Regime } from "./memoryTypes";

export class MemoryCoreV6 {

  private buffer = new MemoryBuffer();
  private decay = new DecayEngine();

  add(entry: MemoryEntry) {
    this.buffer.add(entry);
  }

  computeAdaptiveWeights(baseWeights: Record<string, number>) {
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

    const avgError =
      weightedErrors.reduce((sum, m) => sum + m.error * m.weight, 0) / totalWeight;

    const adjustment = 1 - avgError;

    const updated: Record<string, number> = {};

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
