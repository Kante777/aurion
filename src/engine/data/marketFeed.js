"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketFeed = void 0;
class MarketFeed {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    // This will later connect to OANDA/FCS
    start() {
        // placeholder for live stream hookup
    }
    emitEvent(event) {
        this.bus.emit("MARKET_EVENT", event);
    }
}
exports.MarketFeed = MarketFeed;
