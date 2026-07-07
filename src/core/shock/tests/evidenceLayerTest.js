"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detectorRegistry_1 = require("../evidence/detectorRegistry");
const evidenceBus_1 = require("@evidence/evidenceBus");
const volatilityDetector_1 = require("../detectors/volatilityDetector");
const liquidityDetector_1 = require("../detectors/liquidityDetector");
const spreadDetector_1 = require("../detectors/spreadDetector");
const correlationDetector_1 = require("../detectors/correlationDetector");
const newsDetector_1 = require("../detectors/newsDetector");
const sessionDetector_1 = require("../detectors/sessionDetector");
function runTest() {
    const registry = new detectorRegistry_1.DetectorRegistry();
    registry.register(new volatilityDetector_1.VolatilityDetector());
    registry.register(new liquidityDetector_1.LiquidityDetector());
    registry.register(new spreadDetector_1.SpreadDetector());
    registry.register(new correlationDetector_1.CorrelationDetector());
    registry.register(new newsDetector_1.NewsDetector());
    registry.register(new sessionDetector_1.SessionDetector());
    // 🧠 FIXED CLOCK (deterministic test mode)
    const fixedClock = {
        now: () => 1783291772400
    };
    const bus = new evidenceBus_1.EvidenceBus(registry, fixedClock);
    const snapshot = {
        volatility: 0.8,
        atr: 0.0042,
        liquidityDepth: 0.4,
        orderImbalance: 0.6,
        spread: 0.00025,
        avgSpread: 0.00010,
        correlations: [
            { expected: 1, actual: 0.72 },
            { expected: 1, actual: 0.81 }
        ],
        newsEvent: {
            type: "CPI",
            impact: "HIGH"
        },
        hour: 14,
        volatilitySpike: true
    };
    const run1 = bus.collect(snapshot);
    const run2 = bus.collect(snapshot);
    console.log("\n🧪 RUN 1 EVIDENCE:");
    console.table(run1);
    console.log("\n🧪 RUN 2 EVIDENCE:");
    console.table(run2);
    const deterministic = JSON.stringify(run1) === JSON.stringify(run2);
    console.log("\n⚙️ DETERMINISM CHECK:", deterministic);
    const allNormalized = run1.every(e => e.normalizedScore >= 0 && e.normalizedScore <= 1);
    const allTimestampsExist = run1.every(e => typeof e.timestamp === "number");
    const allExplanationsExist = run1.every(e => typeof e.explanation === "string");
    console.log("\n📊 VALIDATION:");
    console.log("Normalized Scores OK:", allNormalized);
    console.log("Timestamps OK:", allTimestampsExist);
    console.log("Explanations OK:", allExplanationsExist);
    console.log("\n🧠 EVIDENCE COUNT:", run1.length);
}
runTest();
