
import { WorldGraph } from "../world/worldGraph";
import { FragilityNode, CascadeEvent, CrisisForecast } from "./crisisTypes";

export class CrisisEngine {

  constructor(private graph: WorldGraph) {}

  computeFragility(): FragilityNode[] {

    const nodes = this.graph.getNodes();

    return nodes.map(n => {

      const connected = this.graph.getEdges().filter(
        e => e.from === n.id || e.to === n.id
      );

      const avgStrength =
        connected.reduce((sum, e) => sum + e.strength, 0) /
        (connected.length || 1);

      const fragility = Math.min(1, 1 - avgStrength);

      return {
        instrument: n.id,
        fragilityScore: fragility,
        liquidityDepth: Math.max(0.1, 1 - fragility * 0.7),
        volatilityExposure: avgStrength
      };
    });
  }

  simulateCascade(seed: string): CascadeEvent[] {

    const edges = this.graph.getEdges();
    const chain: CascadeEvent[] = [];

    let current = seed;

    for (let i = 0; i < 3; i++) {

      const next = edges.find(e => e.from === current);

      if (!next) break;

      chain.push({
        from: next.from,
        to: next.to,
        delay: i + 1,
        amplification: next.strength * (1 + i * 0.2)
      });

      current = next.to;
    }

    return chain;
  }

  forecastCrisis(): CrisisForecast {

    const fragility = this.computeFragility();

    const weakest = fragility.reduce((min, f) =>
      f.fragilityScore > min.fragilityScore ? f : min,
      fragility[0]
    );

    const cascade = this.simulateCascade(weakest.instrument);

    const avgFragility =
      fragility.reduce((s, f) => s + f.fragilityScore, 0) / fragility.length;

    const probability = Math.min(1, avgFragility * 1.3);

    return {
      probability,
      timeToImpact: Math.max(1, Math.round((1 - probability) * 10)),
      weakestLink: weakest.instrument,
      cascadeChain: cascade
    };
  }
}
