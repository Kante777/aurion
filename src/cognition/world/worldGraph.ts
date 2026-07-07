
import { MarketNode, MarketEdge } from "./worldTypes";

export class WorldGraph {

  private nodes: MarketNode[] = [];
  private edges: MarketEdge[] = [];

  addNode(node: MarketNode) {
    if (!this.nodes.find(n => n.id === node.id)) {
      this.nodes.push(node);
    }
  }

  addEdge(edge: MarketEdge) {
    this.edges.push(edge);
  }

  getNodes() {
    return this.nodes;
  }

  getEdges() {
    return this.edges;
  }

  getInfluenceChain(asset: string) {
    return this.edges.filter(e => e.from === asset || e.to === asset);
  }
}
