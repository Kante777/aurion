import { EventBus } from "../../core/bus/eventBus";
import { StructureEvent } from "./structureTypes";

export class StructureEngine {
  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("TIMEFRAME_STATE_UPDATED", (state: any) => {
      this.detectStructure(state);
    });
  }

  private detectStructure(state: any) {
    const h4 = state.nodes?.H4;
    if (!h4 || h4.candles.length < 20) return;

    const candles = h4.candles.slice(-20);

    const highs = candles.map((c: any) => c.h);
    const lows = candles.map((c: any) => c.l);

    const recent = candles[candles.length - 1];

    const bosBull = recent.c > Math.max(...highs.slice(0, -3));
    const bosBear = recent.c < Math.min(...lows.slice(0, -3));

    if (bosBull) {
      this.emitStructure(state.instrument, "BOS_BULLISH", recent.c);
    }

    if (bosBear) {
      this.emitStructure(state.instrument, "BOS_BEARISH", recent.c);
    }
  }

  private emitStructure(
    instrument: string,
    type: any,
    level: number
  ) {
    const event: StructureEvent = {
      instrument: instrument as any,
      type,
      level,
      strength: 0.8,
      timeframe: "H4",
      timestamp: Date.now(),
    };

    this.bus.emit("STRUCTURE_EVENT", event);
  }
}
