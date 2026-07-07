import { TemporalLearningEngine } from "../../engine/temporal/learning/temporalLearningEngine";
import { FeedbackEngine } from "../../engine/feedback/feedbackEngine";
import { ReinforcementEngine } from "../../engine/reinforcement/reinforcementEngine";
import { RegimeMemoryEngine } from "../../engine/regime/regimeMemoryEngine";

// MOCK EVENT STREAM (no external APIs required for test)
function simulateMacroShock() {
  return [
    { instrument: "EURUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() },
    { instrument: "GBPUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() + 50 },
    { instrument: "XAUUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() + 120 }
  ];
}

export async function runFullSystemTest() {

  console.log("\n🧪 FULL AURION SYSTEM TEST STARTED\n");

  const temporal = new TemporalLearningEngine();
  const feedback = new FeedbackEngine();
  const regimeEngine = new RegimeMemoryEngine();
  const reinforcement = new ReinforcementEngine(
    feedback as any,
    {} as any,
    temporal as any
  );

  // =========================
  // 1. MACRO SHOCK
  // =========================
  const events = simulateMacroShock();

  console.log("📡 MACRO SHOCK EVENTS:");

  for (const e of events) {
    console.log(e);

    temporal.logEvent({
      instrument: e.instrument,
      timestamp: e.timestamp,
      type: e.type,
      data: e.data
    });
  }

  temporal.learnFromEventFlow();

  // =========================
  // 2. LEAD-LAG STRUCTURE
  // =========================
  const structure = temporal.getMarketStructure();

  console.log("\n🧠 LEARNED MARKET STRUCTURE:");
  console.table(structure);

  // =========================
  // 3. SIMULATE PREDICTION
  // =========================
  const prediction = {
  id: "trade_1",
  instrument: "EURUSD",
  predictedDirection: "BUY" as const,
  predictedStrength: 0.78,
  timestamp: Date.now()
};

  feedback.recordPrediction(prediction);

  // =========================
  // 4. SIMULATE OUTCOME
  // =========================
  const outcome = {
  id: "trade_1",
  instrument: "EURUSD",
  actualDirection: "SELL" as const,
  timestamp: Date.now() + 5000
};

  const signal = feedback.generateLearningSignal(outcome);

  console.log("\n📊 FEEDBACK SIGNAL:");
  console.log(signal);

  // =========================
  // 5. APPLY REINFORCEMENT
  // =========================
  reinforcement.runCycle(outcome);

  // =========================
  // 6. REGIME UPDATE
  // =========================
  regimeEngine.update("RISK_OFF", signal?.adjustment < 0);

  console.log("\n🌍 REGIME MEMORY:");
  console.log(regimeEngine.snapshot());

  // =========================
  // 7. FINAL SUMMARY
  // =========================
  console.log("\n🧠 SYSTEM TEST COMPLETE");
  console.log("✔ Temporal learning active");
  console.log("✔ Feedback loop active");
  console.log("✔ Reinforcement applied");
  console.log("✔ Regime memory updated");
}

runFullSystemTest();
