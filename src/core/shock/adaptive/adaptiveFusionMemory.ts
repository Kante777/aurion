export interface FusionMemoryEntry {
  shockScore: number;
  predictedState: string;
  actualState?: string;
  error: number;
  timestamp: number;
}

export class AdaptiveFusionMemory {
  private memory: FusionMemoryEntry[] = [];

  add(entry: FusionMemoryEntry) {
    this.memory.push(entry);

    // prevent memory explosion
    if (this.memory.length > 500) {
      this.memory.shift();
    }
  }

  recent(n = 50) {
    return this.memory.slice(-n);
  }

  all() {
    return this.memory;
  }
}
