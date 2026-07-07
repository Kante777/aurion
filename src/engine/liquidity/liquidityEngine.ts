import { EventBus } from "../../core/bus/eventBus";
import { LiquidityEvent } from "./liquidityTypes";

export class LiquidityEngine {
  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("TIMEFRAME_STATE_UPDATED", (state: any) => {
      this.detectLiquidity(state);
    });
  }

  private detectLiquidity(state: any) {
    const h1 = state.nodes?.H1;
    if (!h1 || h1.candles.length < 20) return;

    const candles = h1.candles.slice(-20);

    const highs = candles.map((c: any) => c.h);
    const lows = candles.map((c: any) => c.l);

    const recent = candles[candles.length - 1];

    const sweepHigh = recent.h > Math.max(...highs.slice(0, -2));
    const sweepLow = recent.l < Math.min(...lows.slice(0, -2));

    if (sweepHigh) {
      this.emitLiquidity(state.instrument, "SWEEP_HIGH", recent.h, "H1");
    }

    if (sweepLow) {
      this.emitLiquidity(state.instrument, "SWEEP_LOW", recent.l, "H1");
    }
  }

  private emitLiquidity(
    instrument: string,
    type: any,
    level: number,
    timeframe: string
  ) {
    const event: LiquidityEvent = {
      instrument: instrument as any,
      type,
      level,
      strength: 0.7,
      timeframe,
      timestamp: Date.now(),
    };

    this.bus.emit("LIQUIDITY_EVENT", event);
  }
}
