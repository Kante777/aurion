"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEngine = void 0;
class WorldEngine {
    graph;
    constructor(graph) {
        this.graph = graph;
    }
    registerMacroShock(shock) {
        const fed = "FED";
        const usd = "USD";
        const gold = "GOLD";
        const equities = "EQUITIES";
        const nodes = [
            { id: fed, type: "MACRO", name: "Federal Reserve" },
            { id: usd, type: "ASSET", name: "US Dollar" },
            { id: gold, type: "ASSET", name: "Gold" },
            { id: equities, type: "SECTOR", name: "Equities" }
        ];
        nodes.forEach(n => this.graph.addNode(n));
        const edges = [
            { from: fed, to: usd, strength: 0.9, lag: 1, regime: "RISK_OFF" },
            { from: usd, to: gold, strength: 0.7, lag: 2, regime: "RISK_OFF" },
            { from: usd, to: equities, strength: 0.8, lag: 1, regime: "RISK_OFF" }
        ];
        edges.forEach(e => this.graph.addEdge(e));
    }
    propagateShock(source) {
        const chain = this.graph.getInfluenceChain(source);
        return chain.map(e => ({
            path: `${e.from} → ${e.to}`,
            impact: e.strength * (e.regime === "RISK_OFF" ? 1.2 : 1)
        }));
    }
}
exports.WorldEngine = WorldEngine;
