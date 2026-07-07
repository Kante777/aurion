"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSHub = void 0;
const ws_1 = require("ws");
class WSHub {
    bus;
    wss;
    constructor(bus) {
        this.bus = bus;
        this.wss = new ws_1.WebSocketServer({ port: 8090 });
        this.attach();
    }
    attach() {
        this.wss.on("connection", (ws) => {
            ws.send(JSON.stringify({
                type: "SYSTEM",
                message: "AURION cognitive stream connected"
            }));
        });
        // stream ALL events from event bus
        this.bus.onAny((event, data) => {
            const packet = JSON.stringify({
                event,
                data,
                timestamp: Date.now()
            });
            this.wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(packet);
                }
            });
        });
    }
}
exports.WSHub = WSHub;
