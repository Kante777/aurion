import { WebSocketServer } from "ws";
import { EventBus } from "../../core/bus/eventBus";

export class WSHub {
  private wss: WebSocketServer;

  constructor(private bus: EventBus) {
    this.wss = new WebSocketServer({ port: 8090 });
    this.attach();
  }

  private attach() {
    this.wss.on("connection", (ws) => {
      ws.send(JSON.stringify({
        type: "SYSTEM",
        message: "AURION cognitive stream connected"
      }));
    });

    // stream ALL events from event bus
    this.bus.onAny((event: string, data: any) => {
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
