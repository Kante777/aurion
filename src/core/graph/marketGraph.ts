import { MarketEdge, MarketNode } from "./graphTypes";
import { Instrument } from "../contracts/instrument";

export class MarketGraph {
  private nodes: Map<Instrument, MarketNode> = new Map();
  private edges: Map<string, MarketEdge> = new Map();

  addNode(node: MarketNode) {
    this.nodes.set(node.instrument, node);
  }

  updateNode(instrument: Instrument, update: Partial<MarketNode>) {
    const node = this.nodes.get(instrument);

    if (!node) return;

    this.nodes.set(instrument, {
      ...node,
      ...update,
    });
  }

  addOrUpdateEdge(edge: MarketEdge) {
    const key = `${edge.from}->${edge.to}`;
    this.edges.set(key, {
      ...edge,
      lastUpdated: Date.now(),
    });
  }

  getNode(instrument: Instrument) {
    return this.nodes.get(instrument);
  }

  getEdges() {
    return Array.from(this.edges.values());
  }

  getOutgoing(instrument: Instrument) {
    return this.getEdges().filter(e => e.from === instrument);
  }

  getIncoming(instrument: Instrument) {
    return this.getEdges().filter(e => e.to === instrument);
  }
}
