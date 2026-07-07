"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("./core/bus/eventBus");
const runtime_1 = require("./core/runtime/runtime");
const compressionEngine_1 = require("./engine/memory/compressionEngine");
const memoryGraph_1 = require("./engine/memory/memoryGraph");
const registry_1 = require("./agents/registry");
const dashboardServer_1 = require("./dashboard/dashboardServer");
const wsHub_1 = require("./dashboard/ws/wsHub");
const bus = new eventBus_1.EventBus();
const runtime = new runtime_1.Runtime(bus);
const compressor = new compressionEngine_1.CompressionEngine();
const memoryGraph = new memoryGraph_1.MemoryGraph();
const mockEvents = Array.from({ length: 100 }).map(() => ({
    id: crypto.randomUUID(),
    instrument: "EURUSD",
    type: "TRADE",
    outcome: Math.random() > 0.5 ? "WIN" : "LOSS",
    features: {
        trend: Math.random(),
        volatility: Math.random(),
        liquidity: Math.random(),
        structure: Math.random()
    },
    timestamp: Date.now()
}));
const patterns = compressor.compress(mockEvents);
patterns.forEach(p => memoryGraph.add(p));
console.log("🧠 MEMORY COMPRESSION COMPLETE");
const agentManager = (0, registry_1.createAgents)();
bus.on("BELIEF_UPDATED", (belief) => {
    const opinions = agentManager.run({ belief });
    bus.emit("AGENT_OPINIONS", opinions);
});
new dashboardServer_1.DashboardServer(bus).start(8080);
new wsHub_1.WSHub(bus);
console.log("🧠 AURION MEMORY SYSTEM ACTIVE");
runtime.start();
