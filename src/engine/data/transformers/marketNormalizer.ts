import { MarketEvent } from "../../../core/contracts/marketEvent";

export class MarketNormalizer {
  static toCandleEvent(
    instrument: string,
    timeframe: string,
    candle: any
  ): MarketEvent {
    return {
      id: crypto.randomUUID(),
      type: "TRADE",
      instrument,
      timestamp: Date.now(),
      payload: {
        timeframe,
        candle
      }
    };
  }
}
