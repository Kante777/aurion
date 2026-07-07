"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const correlationEngine_1 = require("../engine/correlation/correlationEngine");
class CorrelationImpactTest {
    run() {
        console.log("🧪 CORRELATION IMPACT TEST STARTED");
        const engine = new correlationEngine_1.CorrelationEngine();
        // =========================
        // 🌍 GLOBAL SHOCK EVENT
        // =========================
        console.log("\n📡 GLOBAL EVENT: FED RATE HIKE\n");
        // EURUSD (strong SELL bias)
        engine.addEvent("EURUSD", {
            type: "NEWS",
            data: { impact: "HIGH", title: "FED raises rates" }
        });
        engine.addEvent("EURUSD", {
            type: "BELIEF",
            data: { direction: "SELL", confidence: 0.8 }
        });
        // GBPUSD (aligned SELL but weaker)
        engine.addEvent("GBPUSD", {
            type: "BELIEF",
            data: { direction: "SELL", confidence: 0.6 }
        });
        // XAUUSD (divergent BUY reaction)
        engine.addEvent("XAUUSD", {
            type: "BELIEF",
            data: { direction: "BUY", confidence: 0.7 }
        });
        // =========================
        // 🧠 ANALYZE SYSTEM
        // =========================
        const result = engine.analyzeGlobalNarrative();
        console.log("\n📊 RAW OUTPUT:\n");
        for (const r of result.report) {
            console.log({
                instrument: r.instrument,
                role: r.role,
                raw: r.rawSentiment,
                adjusted: r.adjustedSentiment
            });
        }
        console.log("\n🌍 FINAL REGIME:", result.regime);
        // =========================
        // 🧠 DIVERGENCE CHECK
        // =========================
        console.log("\n🔍 DIVERGENCE ANALYSIS:");
        const eur = result.report.find(r => r.instrument === "EURUSD");
        const gbp = result.report.find(r => r.instrument === "GBPUSD");
        const gold = result.report.find(r => r.instrument === "XAUUSD");
        const divergence = Math.sign(eur.adjustedSentiment) === Math.sign(gbp.adjustedSentiment) &&
            Math.sign(gbp.adjustedSentiment) !== Math.sign(gold.adjustedSentiment);
        console.log({
            eur: eur.adjustedSentiment,
            gbp: gbp.adjustedSentiment,
            gold: gold.adjustedSentiment,
            divergenceDetected: divergence
        });
        console.log("\n🧪 TEST COMPLETE");
    }
}
new CorrelationImpactTest().run();
