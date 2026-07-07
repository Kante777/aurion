"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEngine = void 0;
const newsParser_1 = require("./newsParser");
class NewsEngine {
    bus;
    parser = new newsParser_1.NewsParser();
    constructor(bus) {
        this.bus = bus;
    }
    ingest(rawNews) {
        const event = this.parser.parse(rawNews);
        this.bus.emit("NEWS_EVENT", event);
        this.applyMarketImpact(event);
    }
    applyMarketImpact(event) {
        // Convert macro news → system signals
        this.bus.emit("MACRO_SHIFT", {
            bias: event.bias,
            impact: event.impact
        });
        this.bus.emit("NEWS_TO_BELIEF", {
            strength: event.impact === "CRITICAL" ? 0.3 : 0.1,
            assets: event.affectedAssets
        });
    }
}
exports.NewsEngine = NewsEngine;
