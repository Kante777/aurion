import { EventBus } from "../../core/bus/eventBus";
import { MarketEvent } from "../../core/contracts/marketEvent";

export class MarketFeed {
  constructor(private bus: EventBus) {}

  // This will later connect to OANDA/FCS
  public start() {
    // placeholder for live stream hookup
  }

  protected emitEvent(event: MarketEvent) {
    this.bus.emit("MARKET_EVENT", event);
  }
}
