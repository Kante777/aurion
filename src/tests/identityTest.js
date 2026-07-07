"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identityCore_1 = require("../core/identity/identityCore");
const identityMonitor_1 = require("../core/identity/identityMonitor");
const core = new identityCore_1.IdentityCore();
const monitor = new identityMonitor_1.IdentityMonitor(core);
console.log("🧠 IDENTITY TEST START");
for (let i = 0; i < 10; i++) {
    const signal = {
        market: "EURUSD",
        noise: Math.random()
    };
    const result = monitor.runCycle(signal);
    console.log({
        cycle: i,
        coherence: result.identity.coherence,
        drift: result.driftDetected,
        status: result.status
    });
}
console.log("🧠 IDENTITY TEST COMPLETE");
