"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamManager = void 0;
class StreamManager {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    attach() {
        this.bus.onAny((eventName, data) => {
            this.broadcast(eventName, data);
        });
    }
    broadcast(event, data) {
        // In real production: WebSocket / Kafka / SSE
        console.log(`[STREAM] ${event}`, JSON.stringify(data, null, 2));
    }
}
exports.StreamManager = StreamManager;
