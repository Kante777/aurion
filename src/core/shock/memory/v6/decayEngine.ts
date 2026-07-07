import { MemoryEntry } from "./memoryTypes";

export class DecayEngine {

  computeDecay(entry: MemoryEntry, now: number): number {
    const age = now - entry.timestamp;

    // exponential decay (half-life ~ stability bias)
    const lambda = 0.00001;

    return Math.exp(-lambda * age);
  }

  computeLearningWeight(entry: MemoryEntry, now: number): number {
    const decay = this.computeDecay(entry, now);

    // confidence matters
    return decay * entry.confidence * (1 - entry.error);
  }
}
