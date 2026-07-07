import { EventBus } from "../core/bus/eventBus";
import { SimEngine } from "./simEngine";
import { Candle } from "./simTypes";

export class SimRunner {

  private engine: SimEngine;

  constructor(private bus: EventBus) {
    this.engine = new SimEngine(bus);
  }

  runBacktest(instrument: string, candles: Candle[]) {

    this.bus.emit("BACKTEST_STARTED", {
      instrument,
      length: candles.length
    });

    this.engine.run(instrument, candles);
  }
}
