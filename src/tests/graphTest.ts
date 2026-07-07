import { EventBus } from "../core/bus/eventBus";
import { MarketGraph } from "../engine/graph/marketGraph";
import { RegimeEngine } from "../engine/regime/regimeEngine";
import { NarrativeEngine } from "../engine/narrative/narrativeEngine";
import { NodeType } from "../engine/graph/graphTypes";

class GraphTest {

  run() {

    console.log("🧠 FULL COGNITION TEST STARTED");

    const bus = new EventBus();
    const graph = new MarketGraph();
    const regimeEngine = new RegimeEngine();
    const narrativeEngine = new NarrativeEngine();

    const eventBuffer: any[] = [];

    let lastNewsId: string | null = null;

    bus.on("NEWS_EVENT", (data) => {

      const node = {
        id: "news_" + Date.now(),
        type: "NEWS" as NodeType,
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
        type: "BELIEF" as NodeType,
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
