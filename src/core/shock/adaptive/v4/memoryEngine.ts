export type Regime = "STABLE" | "ACTIVE" | "CRISIS";

export interface MemoryRecord {
  shockScore: number;
  predictedState: Regime;
  actualState: Regime;
  error: number;
  confidence: number;
  timestamp: number;
}

export class MemoryEngine {

  private memory: MemoryRecord[] = [];

  add(record: MemoryRecord) {
    this.memory.push(record);

    // keep bounded memory (prevents drift explosion)
    if (this.memory.length > 500) {
      this.memory.shift();
    }
  }

  getAll() {
    return this.memory;
  }

  getByRegime(regime: Regime) {
    return this.memory.filter(m => m.actualState === regime);
  }

  getErrorByRegime(regime: Regime) {
    const set = this.getByRegime(regime);
    if (set.length === 0) return 0;

    return set.reduce((a, b) => a + b.error, 0) / set.length;
  }

  getShockPersistence(): number {
    if (this.memory.length < 2) return 0;

    let persistence = 0;

    for (let i = 1; i < this.memory.length; i++) {
      if (this.memory[i].actualState === this.memory[i - 1].actualState) {
        persistence++;
      }
    }

    return persistence / (this.memory.length - 1);
  }
}
