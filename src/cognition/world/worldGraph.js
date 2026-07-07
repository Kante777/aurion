"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldGraph = void 0;
class WorldGraph {
    nodes = [];
    edges = [];
    addNode(node) {
        if (!this.nodes.find(n => n.id === node.id)) {
            this.nodes.push(node);
        }
    }
    addEdge(edge) {
        this.edges.push(edge);
    }
    getNodes() {
        return this.nodes;
    }
    getEdges() {
        return this.edges;
    }
    getInfluenceChain(asset) {
        return this.edges.filter(e => e.from === asset || e.to === asset);
    }
}
exports.WorldGraph = WorldGraph;
