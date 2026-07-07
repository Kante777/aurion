"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketGraph = void 0;
class MarketGraph {
    nodes = [];
    edges = [];
    addNode(node) {
        this.nodes.push(node);
    }
    addEdge(edge) {
        this.edges.push(edge);
    }
    link(from, to, relation, strength = 0.5) {
        this.edges.push({
            from,
            to,
            relation,
            strength
        });
    }
    getNodes() {
        return this.nodes;
    }
    getEdges() {
        return this.edges;
    }
    // 🧠 NEW: Find contradictions
    detectContradictions() {
        const contradictions = [];
        for (const edge of this.edges) {
            const fromNode = this.nodes.find(n => n.id === edge.from);
            const toNode = this.nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode)
                continue;
            if (fromNode.type === "NEWS" &&
                toNode.type === "BELIEF") {
                const newsBias = fromNode.data?.impact === "HIGH" ? "RISK_OFF" : "NEUTRAL";
                const beliefBias = toNode.data?.direction;
                if ((newsBias === "RISK_OFF" && beliefBias === "BUY") ||
                    (newsBias === "NEUTRAL" && beliefBias === "SELL")) {
                    contradictions.push({
                        from: fromNode.id,
                        to: toNode.id,
                        reason: "NEWS vs BELIEF mismatch",
                        severity: 0.7
                    });
                }
            }
        }
        return contradictions;
    }
    // 🧠 NEW: Simple narrative extraction
    extractNarrative() {
        const story = [];
        for (const edge of this.edges) {
            const from = this.nodes.find(n => n.id === edge.from);
            const to = this.nodes.find(n => n.id === edge.to);
            if (!from || !to)
                continue;
            story.push({
                step: `${from.type} → ${to.type}`,
                relation: edge.relation,
                strength: edge.strength
            });
        }
        return story;
    }
}
exports.MarketGraph = MarketGraph;
