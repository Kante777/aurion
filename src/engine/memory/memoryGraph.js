"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryGraph = void 0;
class MemoryGraph {
    nodes = new Map();
    add(pattern) {
        this.nodes.set(pattern.id, pattern);
    }
    link(a, b, strength) {
        // placeholder for graph edges
        console.log(`Linking ${a} → ${b} (${strength})`);
    }
    queryTopPatterns(limit = 5) {
        return Array.from(this.nodes.values())
            .sort((a, b) => b.successRate - a.successRate)
            .slice(0, limit);
    }
}
exports.MemoryGraph = MemoryGraph;
