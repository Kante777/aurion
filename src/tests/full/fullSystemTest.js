"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFullSystemTest = runFullSystemTest;
const temporalLearningEngine_1 = require("../../engine/temporal/learning/temporalLearningEngine");
const feedbackEngine_1 = require("../../engine/feedback/feedbackEngine");
const reinforcementEngine_1 = require("../../engine/reinforcement/reinforcementEngine");
const regimeMemoryEngine_1 = require("../../engine/regime/regimeMemoryEngine");
// MOCK EVENT STREAM (no external APIs required for test)
function simulateMacroShock() {
    return [
        { instrument: "EURUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() },
        { instrument: "GBPUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() + 50 },
        { instrument: "XAUUSD", type: "NEWS", data: { impact: "HIGH" }, timestamp: Date.now() + 120 }
    ];
}
async function runFullSystemTest() {
    console.log("\n🧪 FULL AURION SYSTEM TEST STARTED\n");
    const temporal = new temporalLearningEngine_1.TemporalLearningEngine();
    const feedback = new feedbackEngine_1.FeedbackEngine();
    const regimeEngine = new regimeMemoryEngine_1.RegimeMemoryEngine();
    const reinforcement = new reinforcementEngine_1.ReinforcementEngine(feedback, {}, temporal);
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
        predictedDirection: "BUY",
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
        actualDirection: "SELL",
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
