export type Regime = "STABLE" | "ACTIVE" | "CRISIS";

export interface MemoryEntry {
  shockScore: number;
  predictedState: Regime;
  actualState: Regime;
  error: number;
  confidence: number;
  timestamp: number;
}

export interface WeightedMemoryEntry extends MemoryEntry {
  decayWeight: number;
  learningWeight: number;
}
