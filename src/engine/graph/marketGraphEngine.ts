import { EventBus } from "../../core/bus/eventBus";
import { MarketGraph } from "../../core/graph/marketGraph";
import { MarketEvent } from "../../core/contracts/marketEvent";
import { Instrument } from "../../core/contracts/instrument";

export class MarketGraphEngine {
  private graph = new MarketGraph();

  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("MARKET_EVENT", (event: MarketEvent) => {
      this.updateNode(event.instrument, event);
      this.updateEdges(event);
    });
  }

  private updateNode(instrument: Instrument, event: MarketEvent) {
    this.graph.addNode({
      instrument,
      volatilityScore: Math.random(), // placeholder analytical layer (replaced later in Phase 4)
      regime: "UNKNOWN",
    });
  }

  private updateEdges(event: MarketEvent) {
    const instruments: Instrument[] = [
      "EURUSD",
      "GBPUSD",
      "USDJPY",
      "XAUUSD",
      "EURUSD",
    ];

    for (const target of instruments) {
      if (target === event.instrument) continue;

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
