"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehavioralEngine = void 0;
class BehavioralEngine {
    graph;
    constructor(graph) {
        this.graph = graph;
    }
    computeSignatures() {
        const nodes = this.graph.getNodes();
        return nodes.map(n => {
            const edges = this.graph.getEdges().filter(e => e.from === n.id || e.to === n.id);
            const avgStrength = edges.reduce((s, e) => s + e.strength, 0) /
                (edges.length || 1);
            const compressionScore = Math.max(0, 1 - avgStrength);
            const liquidityTrapScore = edges.filter(e => e.strength < 0.4).length / (edges.length || 1);
            const institutionalPressure = edges.reduce((s, e) => s + e.strength * 0.5, 0) / (edges.length || 1);
            const breakoutProbability = (compressionScore * 0.5 +
                liquidityTrapScore * 0.3 +
                institutionalPressure * 0.2);
            return {
                instrument: n.id,
                compressionScore,
                liquidityTrapScore,
                institutionalPressure,
                breakoutProbability
            };
        });
    }
    classifyMarket() {
        const signatures = this.computeSignatures();
        const avgBreakout = signatures.reduce((s, x) => s + x.breakoutProbability, 0) /
            signatures.length;
        let regime = "STABLE";
        if (avgBreakout > 0.75)
            regime = "EXPANSION";
        else if (avgBreakout > 0.55)
            regime = "PRE_BREAKOUT";
        else if (avgBreakout > 0.35)
            regime = "FAKE_STABLE";
        return {
            regime,
            confidence: avgBreakout,
            triggers: signatures.map(s => s.instrument)
        };
    }
}
exports.BehavioralEngine = BehavioralEngine;
