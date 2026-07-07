
import { WorldGraph } from "./worldGraph";
import { MarketNode, MarketEdge } from "./worldTypes";

export class WorldEngine {

  constructor(private graph: WorldGraph) {}

  registerMacroShock(shock: string) {

    const fed = "FED";
    const usd = "USD";
    const gold = "GOLD";
    const equities = "EQUITIES";

    const nodes: MarketNode[] = [
      { id: fed, type: "MACRO", name: "Federal Reserve" },
      { id: usd, type: "ASSET", name: "US Dollar" },
      { id: gold, type: "ASSET", name: "Gold" },
      { id: equities, type: "SECTOR", name: "Equities" }
    ];

    nodes.forEach(n => this.graph.addNode(n));

    const edges: MarketEdge[] = [
      { from: fed, to: usd, strength: 0.9, lag: 1, regime: "RISK_OFF" },
      { from: usd, to: gold, strength: 0.7, lag: 2, regime: "RISK_OFF" },
      { from: usd, to: equities, strength: 0.8, lag: 1, regime: "RISK_OFF" }
    ];

    edges.forEach(e => this.graph.addEdge(e));
  }

  propagateShock(source: string) {

    const chain = this.graph.getInfluenceChain(source);

    return chain.map(e => ({
      path: `${e.from} → ${e.to}`,
      impact: e.strength * (e.regime === "RISK_OFF" ? 1.2 : 1)
    }));
  }
}
