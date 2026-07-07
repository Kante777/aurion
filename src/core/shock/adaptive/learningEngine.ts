import { MemoryRecord } from "./adaptiveMemory";

export class LearningEngine {
  private lr = 0.15;

  computeEffectiveError(record: MemoryRecord, now: number) {
    const age = (now - record.timestamp) / 100000;
    const recencyWeight = Math.exp(-age);

    return record.error * record.confidence * recencyWeight;
  }

  updateWeights(
    weights: Record<string, number>,
    memory: MemoryRecord[],
    now: number
  ) {
    const updated: Record<string, number> = { ...weights };

    for (const record of memory) {
      const effError = this.computeEffectiveError(record, now);

      for (const key in updated) {
        updated[key] *= (1 - this.lr * effError);
      }
    }

    return updated;
  }
}
