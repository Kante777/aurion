"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const logger_1 = require("../logger/logger");
class Runtime {
    bus;
    running = false;
    constructor(bus) {
        this.bus = bus;
    }
    start() {
        this.running = true;
        logger_1.Logger.info("AURION runtime started");
        this.loop();
    }
    stop() {
        this.running = false;
        logger_1.Logger.info("AURION runtime stopped");
    }
    loop() {
        const tick = () => {
            if (!this.running)
                return;
            this.bus.emit("SYSTEM_TICK", {
                timestamp: Date.now(),
            });
            setTimeout(tick, 1000);
        };
        tick();
    }
}
exports.Runtime = Runtime;
