"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketNormalizer = void 0;
class MarketNormalizer {
    static toCandleEvent(instrument, timeframe, candle) {
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
exports.MarketNormalizer = MarketNormalizer;
