"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketGraph = void 0;
class MarketGraph {
    nodes = new Map();
    edges = new Map();
    addNode(node) {
        this.nodes.set(node.instrument, node);
    }
    updateNode(instrument, update) {
        const node = this.nodes.get(instrument);
        if (!node)
            return;
        this.nodes.set(instrument, {
            ...node,
            ...update,
        });
    }
    addOrUpdateEdge(edge) {
        const key = `${edge.from}->${edge.to}`;
        this.edges.set(key, {
            ...edge,
            lastUpdated: Date.now(),
        });
    }
    getNode(instrument) {
        return this.nodes.get(instrument);
    }
    getEdges() {
        return Array.from(this.edges.values());
    }
    getOutgoing(instrument) {
        return this.getEdges().filter(e => e.from === instrument);
    }
    getIncoming(instrument) {
        return this.getEdges().filter(e => e.to === instrument);
    }
}
exports.MarketGraph = MarketGraph;
