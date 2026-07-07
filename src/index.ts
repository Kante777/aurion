import { EventBus } from "./core/bus/eventBus";
import { Runtime } from "./core/runtime/runtime";
import { CompressionEngine } from "./engine/memory/compressionEngine";
import { MemoryGraph } from "./engine/memory/memoryGraph";
import { createAgents } from "./agents/registry";
import { DashboardServer } from "./dashboard/dashboardServer";
import { WSHub } from "./dashboard/ws/wsHub";

const bus = new EventBus();
const runtime = new Runtime(bus);

const compressor = new CompressionEngine();
const memoryGraph = new MemoryGraph();

const mockEvents = Array.from({ length: 100 }).map(() => ({
  id: crypto.randomUUID(),
  instrument: "EURUSD",
  type: "TRADE" as const,
  outcome: Math.random() > 0.5 ? "WIN" : "LOSS",
  features: {
    trend: Math.random(),
    volatility: Math.random(),
    liquidity: Math.random(),
    structure: Math.random()
  },
  timestamp: Date.now()
}));

const patterns = compressor.compress(mockEvents as any);

patterns.forEach(p => memoryGraph.add(p));

console.log("🧠 MEMORY COMPRESSION COMPLETE");

const agentManager = createAgents();

bus.on("BELIEF_UPDATED", (belief) => {
  const opinions = agentManager.run({ belief });
  bus.emit("AGENT_OPINIONS", opinions);
});

new DashboardServer(bus).start(8080);
new WSHub(bus);

console.log("🧠 AURION MEMORY SYSTEM ACTIVE");

runtime.start();
