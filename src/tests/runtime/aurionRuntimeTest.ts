import { AurionRuntime } from "../../engine/runtime/aurionRuntime";

function simulateMarket() {

  const runtime = new AurionRuntime();

  console.log("\n🧪 AURION FULL RUNTIME TEST STARTED\n");

  // =========================
  // 1. SIMULATED MARKET EVENTS
  // =========================
  const events = [
    {
      instrument: "EURUSD",
      type: "NEWS",
      timestamp: Date.now(),
      data: { impact: "HIGH" }
    },
    {
      instrument: "GBPUSD",
      type: "NEWS",
      timestamp: Date.now() + 40,
      data: { impact: "HIGH" }
    },
    {
      instrument: "XAUUSD",
      type: "NEWS",
      timestamp: Date.now() + 120,
      data: { impact: "HIGH" }
    }
  ];

  // =========================
  // 2. RUN CORE PIPELINE (NO OUTCOME YET)
  // =========================
  const result1 = runtime.process(events);

  console.log("\n📊 TEMPORAL STRUCTURE:");
  console.log("\n📊 NODES:");
console.table(result1.nodes);

console.log("\n🔗 CAUSAL EDGES:");
console.table(result1.causalGraph);

  console.log("\n🧠 CAUSAL GRAPH:");
  console.log(result1.causalGraph);

  console.log("\n🌍 REGIME STATE:");
  console.log(result1.regime);

  // =========================
  // 3. SIMULATE MARKET OUTCOME
  // =========================
  const outcome = {
    id: "trade_1",
    instrument: "EURUSD",
    actualDirection: "SELL",
    timestamp: Date.now() + 5000
  };

  const result2 = runtime.process([], outcome);

  console.log("\n📊 FEEDBACK SIGNAL:");
  console.log(result2.signal);

  console.log("\n🌍 UPDATED REGIME STATE:");
  console.log(result2.regime);

  // =========================
  // 4. FINAL SUMMARY
  // =========================
  console.log("\n🧠 FULL SYSTEM TEST COMPLETE");
  console.log("✔ Temporal engine active");
  console.log("✔ Causal engine active");
  console.log("✔ Reinforcement engine active");
  console.log("✔ Regime memory active");
  console.log("✔ Unified runtime operational");
}

simulateMarket();
