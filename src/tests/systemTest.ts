import { EventBus } from "../core/bus/eventBus";
import { Runtime } from "../core/runtime/runtime";

import { DecisionEngine } from "../engine/decision/decisionEngine";

import { createAgents } from "../agents/registry";

export class SystemTest {

  run() {

    const bus = new EventBus();
    const runtime = new Runtime(bus);

    const decisionEngine = new DecisionEngine();
    const agents = createAgents();

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
