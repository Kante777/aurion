"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temporalEngine_1 = require("../engine/temporal/temporalEngine");
class TemporalFlowTest {
    run() {
        console.log("🧪 TEMPORAL FLOW TEST STARTED");
        const engine = new temporalEngine_1.TemporalEngine();
        const instruments = ["EURUSD", "GBPUSD", "XAUUSD", "NAS100"];
        console.log("\n📊 FLOW ORDER:\n");
        const flow = engine.buildFlowOrder(instruments);
        console.table(flow);
        console.log("\n🔗 FLOW SHIFT ANALYSIS:\n");
        console.log(engine.detectFlowShift("EURUSD", "GBPUSD"));
        console.log(engine.detectFlowShift("EURUSD", "XAUUSD"));
        console.log(engine.detectFlowShift("NAS100", "XAUUSD"));
        console.log("\n🧠 TEMPORAL ANALYSIS COMPLETE");
    }
}
new TemporalFlowTest().run();
