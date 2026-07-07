"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../core/bus/eventBus");
const marketGraph_1 = require("../engine/graph/marketGraph");
const regimeEngine_1 = require("../engine/regime/regimeEngine");
const narrativeEngine_1 = require("../engine/narrative/narrativeEngine");
class GraphTest {
    run() {
        console.log("🧠 FULL COGNITION TEST STARTED");
        const bus = new eventBus_1.EventBus();
        const graph = new marketGraph_1.MarketGraph();
        const regimeEngine = new regimeEngine_1.RegimeEngine();
        const narrativeEngine = new narrativeEngine_1.NarrativeEngine();
        const eventBuffer = [];
        let lastNewsId = null;
        bus.on("NEWS_EVENT", (data) => {
            const node = {
                id: "news_" + Date.now(),
                type: "NEWS",
                timestamp: Date.now(),
                data
            };
            graph.addNode(node);
            eventBuffer.push(node);
            lastNewsId = node.id;
            console.log("🧠 NEWS");
        });
        bus.on("BELIEF_UPDATED", (data) => {
            const node = {
                id: "belief_" + Date.now(),
                type: "BELIEF",
                timestamp: Date.now(),
                data
            };
            graph.addNode(node);
            eventBuffer.push(node);
            console.log("🧠 BELIEF");
            if (lastNewsId) {
                graph.link(lastNewsId, node.id, "INFLUENCES", 0.9);
            }
            const contradictions = graph.detectContradictions();
            if (contradictions.length > 0) {
                console.log("⚠ CONTRADICTIONS:", contradictions);
            }
            const narrative = graph.extractNarrative();
            console.log("📖 GRAPH NARRATIVE:", narrative);
            const regime = regimeEngine.detect(eventBuffer);
            console.log("🌍 MARKET REGIME:", regime);
            // 🧠 NEW: MEMORY COMPRESSION
            const memory = narrativeEngine.compress(eventBuffer);
            console.log("🧠 COMPRESSED STORY:", memory);
        });
        bus.emit("NEWS_EVENT", {
            title: "FED raises rates",
            impact: "HIGH"
        });
        bus.emit("BELIEF_UPDATED", {
            confidence: 0.8,
            direction: "BUY"
        });
        console.log("📊 FINAL MEMORY:", narrativeEngine.getMemory());
    }
}
new GraphTest().run();
