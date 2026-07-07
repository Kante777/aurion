export interface MemoryRecord {
  shockScore: number;
  predictedState: string;
  actualState: string;
  error: number;
  confidence: number;
  timestamp: number;
}

export class AdaptiveMemory {
  private memory: MemoryRecord[] = [];

  add(record: MemoryRecord) {
    this.memory.push(record);
  }

  getAll() {
    return this.memory;
  }

  decay(limit = 50) {
    if (this.memory.length > limit) {
      this.memory = this.memory.slice(-limit);
    }
  }
}
