import { EventBus } from "../core/bus/eventBus";
import { Candle } from "./simTypes";

export class SimEngine {

  constructor(private bus: EventBus) {}

  run(instrument: string, candles: Candle[]) {

    let index = 0;

    const interval = setInterval(() => {

      if (index >= candles.length) {
        clearInterval(interval);
        this.bus.emit("SIMULATION_COMPLETE", { instrument });
        return;
      }

      const candle = candles[index];

      this.processCandle(instrument, candle);

      index++;

    }, 10); // fast replay
  }

  private processCandle(instrument: string, candle: Candle) {

    // emit fake market tick into system
    this.bus.emit("MARKET_DATA", {
      instrument,
      candle
    });

    this.bus.emit("SIMULATION_TICK", {
      instrument,
      candle
    });
  }
}
