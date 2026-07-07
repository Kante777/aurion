"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataEngine = void 0;
const oanda_connector_1 = require("./connectors/oanda.connector");
const marketNormalizer_1 = require("./transformers/marketNormalizer");
class MarketDataEngine {
    bus;
    oanda = new oanda_connector_1.OandaConnector();
    constructor(bus) {
        this.bus = bus;
    }
    async start() {
        this.pollOanda();
    }
    async pollOanda() {
        setInterval(async () => {
            try {
                const data = await this.oanda.getCandles("EUR_USD", "M5");
                const candles = data.candles || [];
                for (const c of candles) {
                    const event = marketNormalizer_1.MarketNormalizer.toCandleEvent("EURUSD", "M5", c);
                    this.bus.emit("MARKET_EVENT", event);
                }
            }
            catch (err) {
                console.error("OANDA feed error:", err);
            }
        }, 5000);
    }
}
exports.MarketDataEngine = MarketDataEngine;
