
import { EvolutionEngine } from "./evolutionEngine";

export class EvolutionMonitor {

  constructor(private engine: EvolutionEngine) {}

  runCycle() {

    const result = this.engine.evolve();

    const avgFitness =
      result.mutated.reduce((s, s2) => s + s2.fitness, 0) /
      Math.max(1, result.mutated.length);

    return {
      timestamp: Date.now(),
      survivors: result.survivors.length,
      eliminated: result.eliminated.length,
      avgFitness,
      stability:
        avgFitness > 1
          ? "IMPROVING"
          : avgFitness > 0.5
          ? "STABLE"
          : "DECLINING"
    };
  }
}
