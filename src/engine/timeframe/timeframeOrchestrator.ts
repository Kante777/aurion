import { EventBus } from "../../core/bus/eventBus";
import { MarketEvent } from "../../core/contracts/marketEvent";
import { MarketStateTree } from "../../core/state/marketStateTree";

export class TimeframeOrchestrator {
  private stateMap: Map<string, MarketStateTree> = new Map();

  constructor(private bus: EventBus) {
    this.registerListeners();
  }

  private registerListeners() {
    this.bus.on("MARKET_EVENT", (event: MarketEvent) => {
      if (event.type === "CANDLE") {
        this.processCandle(event);
      }
    });
  }

  private processCandle(event: MarketEvent) {
    const key = event.instrument;

    let state = this.stateMap.get(key);

    if (!state) {
      state = this.createInitialState(event.instrument);
      this.stateMap.set(key, state);
    }

    const tf = event.timeframe ?? "M1";
    const node = state.nodes[tf];

    node.candles.push(event.payload);

    if (node.candles.length > 200) {
      node.candles.shift();
    }

    this.updateStructure(node);

    state.lastUpdated = Date.now();
    this.stateMap.set(key, state);

    this.bus.emit("TIMEFRAME_STATE_UPDATED", state);
  }

  private createInitialState(instrument: any): MarketStateTree {
    const timeframes = ["M1","M5","M15","M30","H1","H4","D1","W1"];

    const nodes: any = {};

    for (const tf of timeframes) {
      nodes[tf] = {
        timeframe: tf,
        candles: [],
        structure: "UNKNOWN",
      };
    }

    return {
      instrument,
      nodes,
      bias: "NEUTRAL",
      regime: "UNKNOWN",
      lastUpdated: Date.now(),
    };
  }

  private updateStructure(node: any) {
    if (node.candles.length < 10) return;

    const last = node.candles[node.candles.length - 1];
    const prev = node.candles[node.candles.length - 10];

    if (!last || !prev) return;

    if (last.c > prev.c) node.structure = "BULLISH";
    else if (last.c < prev.c) node.structure = "BEARISH";
    else node.structure = "RANGE";
  }
}
