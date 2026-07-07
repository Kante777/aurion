
export interface StrategyGenome {
  id: string;
  fitness: number;
  mutationRate: number;
  generation: number;
  traits: {
    aggressiveness: number;
    riskTolerance: number;
    confirmationBias: number;
  };
}

export interface EvolutionResult {
  survivors: StrategyGenome[];
  eliminated: StrategyGenome[];
  mutated: StrategyGenome[];
}
