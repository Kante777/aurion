import { DetectorRegistry } from "../evidence/detectorRegistry";
import { EvidenceBus } from "@evidence/evidenceBus";

import { VolatilityDetector } from "../detectors/volatilityDetector";
import { LiquidityDetector } from "../detectors/liquidityDetector";
import { SpreadDetector } from "../detectors/spreadDetector";
import { CorrelationDetector } from "../detectors/correlationDetector";
import { NewsDetector } from "../detectors/newsDetector";
import { SessionDetector } from "../detectors/sessionDetector";

function runTest() {

    const registry = new DetectorRegistry();

    registry.register(new VolatilityDetector());
    registry.register(new LiquidityDetector());
    registry.register(new SpreadDetector());
    registry.register(new CorrelationDetector());
    registry.register(new NewsDetector());
    registry.register(new SessionDetector());

    // 🧠 FIXED CLOCK (deterministic test mode)
    const fixedClock = {
        now: () => 1783291772400
    };

    const bus = new EvidenceBus(registry, fixedClock);

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

    const deterministic =
        JSON.stringify(run1) === JSON.stringify(run2);

    console.log("\n⚙️ DETERMINISM CHECK:", deterministic);

    const allNormalized = run1.every(e =>
        e.normalizedScore >= 0 && e.normalizedScore <= 1
    );

    const allTimestampsExist = run1.every(e =>
        typeof e.timestamp === "number"
    );

    const allExplanationsExist = run1.every(e =>
        typeof e.explanation === "string"
    );

    console.log("\n📊 VALIDATION:");
    console.log("Normalized Scores OK:", allNormalized);
    console.log("Timestamps OK:", allTimestampsExist);
    console.log("Explanations OK:", allExplanationsExist);

    console.log("\n🧠 EVIDENCE COUNT:", run1.length);
}

runTest();
