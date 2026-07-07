"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../core/bus/eventBus");
const correlationEngine_1 = require("../engine/correlation/correlationEngine");
class MultiMarketTest {
    run() {
        console.log("🌐 MULTI-MARKET COGNITIVE FUSION TEST STARTED");
        const bus = new eventBus_1.EventBus();
        const correlation = new correlationEngine_1.CorrelationEngine();
        const instruments = ["EURUSD", "GBPUSD", "XAUUSD"];
        // 🧠 helper: route events into instruments
        function emit(instrument, type, data) {
            correlation.addEvent(instrument, {
                type,
                data,
                timestamp: Date.now()
            });
        }
        // =========================
        // 🌍 MACRO EVENT (GLOBAL)
        // =========================
        console.log("\n📡 GLOBAL NEWS EVENT: FED RATE HIKE\n");
        instruments.forEach(i => {
            emit(i, "NEWS", {
                title: "FED raises rates",
                impact: "HIGH"
            });
        });
        // =========================
        // 🧠 LOCAL BELIEF RESPONSES
        // =========================
        console.log("\n🧠 INSTRUMENT BELIEF RESPONSES\n");
        emit("EURUSD", "BELIEF", {
            direction: "SELL",
            confidence: 0.8
        });
        emit("GBPUSD", "BELIEF", {
            direction: "SELL",
            confidence: 0.7
        });
        emit("XAUUSD", "BELIEF", {
            direction: "BUY",
            confidence: 0.75
        });
        // =========================
        // 🌐 GLOBAL ANALYSIS
        // =========================
        const result = correlation.analyzeGlobalNarrative();
        console.log("\n🌍 GLOBAL MARKET REGIME:", result.regime);
        console.log("\n📊 INSTRUMENT REPORT:");
        console.log(result.report);
        console.log("\n🧠 MULTI-MARKET FUSION COMPLETE");
    }
}
new MultiMarketTest().run();
