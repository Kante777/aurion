
import { ShockSignal, SystemStress } from "./shockTypes";
import { WorldGraph } from "../world/worldGraph";

export class ShockDetector {

  constructor(private graph: WorldGraph) {}

  detectContradictions(): ShockSignal[] {

    const edges = this.graph.getEdges();

    const signals: ShockSignal[] = [];

    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges.length; j++) {

        const a = edges[i];
        const b = edges[j];

        if (a.from === b.from && a.to === b.to && a.regime !== b.regime) {

          signals.push({
            source: a.from,
            intensity: Math.abs(a.strength - b.strength),
            type: "CONTRADICTION",
            timestamp: Date.now()
          });
        }
      }
    }

    return signals;
  }

  detectCorrelationBreak(): ShockSignal[] {

    const edges = this.graph.getEdges();

    return edges
      .filter(e => e.strength < 0.3)
      .map(e => ({
        source: e.from,
        intensity: 1 - e.strength,
        type: "CORRELATION_BREAK",
        timestamp: Date.now()
      }));
  }

  computeStress(): SystemStress {

    const contradictions = this.detectContradictions();
    const breaks = this.detectCorrelationBreak();

    const all = [...contradictions, ...breaks];

    const score = all.reduce((sum, s) => sum + s.intensity, 0);

    let level: SystemStress["level"] = "LOW";

    if (score > 5) level = "CRITICAL";
    else if (score > 3) level = "HIGH";
    else if (score > 1) level = "MEDIUM";

    return {
      score,
      level,
      triggers: all
    };
  }
}
