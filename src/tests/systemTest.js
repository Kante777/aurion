"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemTest = void 0;
const eventBus_1 = require("../core/bus/eventBus");
const runtime_1 = require("../core/runtime/runtime");
const decisionEngine_1 = require("../engine/decision/decisionEngine");
const registry_1 = require("../agents/registry");
class SystemTest {
    run() {
        const bus = new eventBus_1.EventBus();
        const runtime = new runtime_1.Runtime(bus);
        const decisionEngine = new decisionEngine_1.DecisionEngine();
        const agents = (0, registry_1.createAgents)();
        bus.on("BELIEF_UPDATED", (belief) => {
            const state = { belief };
            const decisions = agents.run(state);
            const finalDecision = decisionEngine.run("EURUSD", decisions);
            bus.emit("FINAL_DECISION", finalDecision);
        });
        // simulate belief
        bus.emit("BELIEF_UPDATED", {
            confidence: 0.78,
            direction: "BUY"
        });
        runtime.start();
    }
}
exports.SystemTest = SystemTest;
