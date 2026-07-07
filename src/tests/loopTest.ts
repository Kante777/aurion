import { EventBus } from "../core/bus/eventBus";
import { DecisionEngine } from "../engine/decision/decisionEngine";
import { createAgents } from "../agents/registry";

export class LoopTest {

  run() {

    console.log("🧪 CLOSED LOOP TEST STARTING");

    const bus = new EventBus();

    const decisionEngine = new DecisionEngine();
    const agentManager = createAgents();

    // ==============================
    // LOOP CONNECTION
    // ==============================

    bus.on("BELIEF_UPDATED", (belief) => {

      console.log("🧠 BELIEF RECEIVED:", belief);

      const state = { belief };

      const agentDecisions = agentManager.run(state);

      console.log("🤖 AGENT DECISIONS:", agentDecisions);

      const finalDecision =
        decisionEngine.run("EURUSD", agentDecisions);

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
