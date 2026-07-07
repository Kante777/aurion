"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopTest = void 0;
const eventBus_1 = require("../core/bus/eventBus");
const decisionEngine_1 = require("../engine/decision/decisionEngine");
const registry_1 = require("../agents/registry");
class LoopTest {
    run() {
        console.log("🧪 CLOSED LOOP TEST STARTING");
        const bus = new eventBus_1.EventBus();
        const decisionEngine = new decisionEngine_1.DecisionEngine();
        const agentManager = (0, registry_1.createAgents)();
        // ==============================
        // LOOP CONNECTION
        // ==============================
        bus.on("BELIEF_UPDATED", (belief) => {
            console.log("🧠 BELIEF RECEIVED:", belief);
            const state = { belief };
            const agentDecisions = agentManager.run(state);
            console.log("🤖 AGENT DECISIONS:", agentDecisions);
            const finalDecision = decisionEngine.run("EURUSD", agentDecisions);
            console.log("🏛️ FINAL DECISION:", finalDecision);
            bus.emit("FINAL_DECISION", finalDecision);
        });
        // ==============================
        // TEST INPUT (BELIEF)
        // ==============================
        bus.emit("BELIEF_UPDATED", {
            confidence: 0.82,
            direction: "BUY"
        });
        console.log("🧪 LOOP TEST COMPLETED INITIATED");
    }
}
exports.LoopTest = LoopTest;
