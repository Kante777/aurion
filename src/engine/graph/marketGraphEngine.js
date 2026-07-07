"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketGraphEngine = void 0;
const marketGraph_1 = require("../../core/graph/marketGraph");
class MarketGraphEngine {
    bus;
    graph = new marketGraph_1.MarketGraph();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("MARKET_EVENT", (event) => {
            this.updateNode(event.instrument, event);
            this.updateEdges(event);
        });
    }
    updateNode(instrument, event) {
        this.graph.addNode({
            instrument,
            volatilityScore: Math.random(), // placeholder analytical layer (replaced later in Phase 4)
            regime: "UNKNOWN",
        });
    }
    updateEdges(event) {
        const instruments = [
            "EURUSD",
            "GBPUSD",
            "USDJPY",
            "XAUUSD",
            "EURUSD",
        ];
        for (const target of instruments) {
            if (target === event.instrument)
                continue;
            const influence = Math.random(); // placeholder logic (replaced in Phase 4 causality engine)
            this.graph.addOrUpdateEdge({
                from: event.instrument,
                to: target,
                influence,
                direction: influence > 0.5 ? "LEADS" : "LAGS",
                latencyMs: Math.floor(Math.random() * 5000),
                strength: influence,
                lastUpdated: Date.now(),
            });
        }
    }
    getGraph() {
        return this.graph;
    }
}
exports.MarketGraphEngine = MarketGraphEngine;
