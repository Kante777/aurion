"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureEngine = void 0;
class StructureEngine {
    bus;
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("TIMEFRAME_STATE_UPDATED", (state) => {
            this.detectStructure(state);
        });
    }
    detectStructure(state) {
        const h4 = state.nodes?.H4;
        if (!h4 || h4.candles.length < 20)
            return;
        const candles = h4.candles.slice(-20);
        const highs = candles.map((c) => c.h);
        const lows = candles.map((c) => c.l);
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
    emitStructure(instrument, type, level) {
        const event = {
            instrument: instrument,
            type,
            level,
            strength: 0.8,
            timeframe: "H4",
            timestamp: Date.now(),
        };
        this.bus.emit("STRUCTURE_EVENT", event);
    }
}
exports.StructureEngine = StructureEngine;
