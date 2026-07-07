import { EventBus } from "../bus/eventBus";
import { Logger } from "../logger/logger";

export class Runtime {
  private running = false;

  constructor(private bus: EventBus) {}

  start() {
    this.running = true;
    Logger.info("AURION runtime started");

    this.loop();
  }

  stop() {
    this.running = false;
    Logger.info("AURION runtime stopped");
  }

  private loop() {
    const tick = () => {
      if (!this.running) return;

      this.bus.emit("SYSTEM_TICK", {
        timestamp: Date.now(),
      });

      setTimeout(tick, 1000);
    };

    tick();
  }
}
