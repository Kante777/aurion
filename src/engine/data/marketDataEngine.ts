import { EventBus } from "../../core/bus/eventBus";
import { OandaConnector } from "./connectors/oanda.connector";
import { MarketNormalizer } from "./transformers/marketNormalizer";

export class MarketDataEngine {
  private oanda = new OandaConnector();

  constructor(private bus: EventBus) {}

  async start() {
    this.pollOanda();
  }

  private async pollOanda() {
    setInterval(async () => {
      try {
        const data = await this.oanda.getCandles("EUR_USD", "M5");

        const candles = data.candles || [];

        for (const c of candles) {
          const event = MarketNormalizer.toCandleEvent(
            "EURUSD",
            "M5",
            c
          );

          this.bus.emit("MARKET_EVENT", event);
        }
      } catch (err) {
        console.error("OANDA feed error:", err);
      }
    }, 5000);
  }
}
