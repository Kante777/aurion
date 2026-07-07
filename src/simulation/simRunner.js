"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimRunner = void 0;
const simEngine_1 = require("./simEngine");
class SimRunner {
    bus;
    engine;
    constructor(bus) {
        this.bus = bus;
        this.engine = new simEngine_1.SimEngine(bus);
    }
    runBacktest(instrument, candles) {
        this.bus.emit("BACKTEST_STARTED", {
            instrument,
            length: candles.length
        });
        this.engine.run(instrument, candles);
    }
}
exports.SimRunner = SimRunner;
