"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeframeOrchestrator = void 0;
class TimeframeOrchestrator {
    bus;
    stateMap = new Map();
    constructor(bus) {
        this.bus = bus;
        this.registerListeners();
    }
    registerListeners() {
        this.bus.on("MARKET_EVENT", (event) => {
            if (event.type === "CANDLE") {
                this.processCandle(event);
            }
        });
    }
    processCandle(event) {
        const key = event.instrument;
        let state = this.stateMap.get(key);
        if (!state) {
            state = this.createInitialState(event.instrument);
            this.stateMap.set(key, state);
        }
        const tf = event.timeframe ?? "M1";
        const node = state.nodes[tf];
        node.candles.push(event.payload);
        if (node.candles.length > 200) {
            node.candles.shift();
        }
        this.updateStructure(node);
        state.lastUpdated = Date.now();
        this.stateMap.set(key, state);
        this.bus.emit("TIMEFRAME_STATE_UPDATED", state);
    }
    createInitialState(instrument) {
        const timeframes = ["M1", "M5", "M15", "M30", "H1", "H4", "D1", "W1"];
        const nodes = {};
        for (const tf of timeframes) {
            nodes[tf] = {
                timeframe: tf,
                candles: [],
                structure: "UNKNOWN",
            };
        }
        return {
            instrument,
            nodes,
            bias: "NEUTRAL",
            regime: "UNKNOWN",
            lastUpdated: Date.now(),
        };
    }
    updateStructure(node) {
        if (node.candles.length < 10)
            return;
        const last = node.candles[node.candles.length - 1];
        const prev = node.candles[node.candles.length - 10];
        if (!last || !prev)
            return;
        if (last.c > prev.c)
            node.structure = "BULLISH";
        else if (last.c < prev.c)
            node.structure = "BEARISH";
        else
            node.structure = "RANGE";
    }
}
exports.TimeframeOrchestrator = TimeframeOrchestrator;
