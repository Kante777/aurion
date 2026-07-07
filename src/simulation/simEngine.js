"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimEngine = void 0;
class SimEngine {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    run(instrument, candles) {
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
    processCandle(instrument, candle) {
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
exports.SimEngine = SimEngine;
