"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityEngine = void 0;
class LiquidityEngine {
    bus;
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("TIMEFRAME_STATE_UPDATED", (state) => {
            this.detectLiquidity(state);
        });
    }
    detectLiquidity(state) {
        const h1 = state.nodes?.H1;
        if (!h1 || h1.candles.length < 20)
            return;
        const candles = h1.candles.slice(-20);
        const highs = candles.map((c) => c.h);
        const lows = candles.map((c) => c.l);
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
    emitLiquidity(instrument, type, level, timeframe) {
        const event = {
            instrument: instrument,
            type,
            level,
            strength: 0.7,
            timeframe,
            timestamp: Date.now(),
        };
        this.bus.emit("LIQUIDITY_EVENT", event);
    }
}
exports.LiquidityEngine = LiquidityEngine;
