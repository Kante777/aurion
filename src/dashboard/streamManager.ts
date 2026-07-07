import { EventBus } from "../core/bus/eventBus";

export class StreamManager {
  constructor(private bus: EventBus) {}

  public attach() {
    this.bus.onAny((eventName: string, data: any) => {
      this.broadcast(eventName, data);
    });
  }

  private broadcast(event: string, data: any) {
    // In real production: WebSocket / Kafka / SSE
    console.log(`[STREAM] ${event}`, JSON.stringify(data, null, 2));
  }
}
