"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionEngine = void 0;
class EvolutionEngine {
    population = [];
    seed(strategies) {
        this.population = strategies.map(s => ({
            id: s.id,
            fitness: s.successRate + s.expectedEdge,
            mutationRate: Math.random() * 0.2,
            generation: 0,
            traits: {
                aggressiveness: Math.random(),
                riskTolerance: Math.random(),
                confirmationBias: Math.random()
            }
        }));
    }
    evolve() {
        const sorted = [...this.population].sort((a, b) => b.fitness - a.fitness);
        const survivors = sorted.slice(0, Math.ceil(sorted.length * 0.5));
        const eliminated = sorted.slice(Math.ceil(sorted.length * 0.5));
        const mutated = survivors.map(s => ({
            ...s,
            generation: s.generation + 1,
            fitness: s.fitness + (Math.random() - 0.5) * 0.1,
            traits: {
                aggressiveness: this.mutate(s.traits.aggressiveness, s.mutationRate),
                riskTolerance: this.mutate(s.traits.riskTolerance, s.mutationRate),
                confirmationBias: this.mutate(s.traits.confirmationBias, s.mutationRate)
            }
        }));
        this.population = mutated;
        return {
            survivors,
            eliminated,
            mutated
        };
    }
    mutate(value, rate) {
        return Math.min(1, Math.max(0, value + (Math.random() - 0.5) * rate));
    }
    getPopulation() {
        return this.population;
    }
}
exports.EvolutionEngine = EvolutionEngine;
