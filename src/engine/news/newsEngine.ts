import { EventBus } from "../../core/bus/eventBus";
import { NewsParser } from "./newsParser";

export class NewsEngine {

  private parser = new NewsParser();

  constructor(private bus: EventBus) {}

  ingest(rawNews: any) {

    const event = this.parser.parse(rawNews);

    this.bus.emit("NEWS_EVENT", event);

    this.applyMarketImpact(event);
  }

  private applyMarketImpact(event: any) {

    // Convert macro news → system signals

    this.bus.emit("MACRO_SHIFT", {
      bias: event.bias,
      impact: event.impact
    });

    this.bus.emit("NEWS_TO_BELIEF", {
      strength: event.impact === "CRITICAL" ? 0.3 : 0.1,
      assets: event.affectedAssets
    });
  }
}
