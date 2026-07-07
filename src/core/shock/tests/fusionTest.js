"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fusionCore_1 = require("../../fusion/fusionCore");
// Mock evidence from Phase 22.1
const evidence = [
    { detector: "volatility_detector", normalizedScore: 0.48, confidence: 0.85 },
    { detector: "liquidity_detector", normalizedScore: 0.60, confidence: 0.80 },
    { detector: "spread_detector", normalizedScore: 0.30, confidence: 0.78 },
    { detector: "correlation_detector", normalizedScore: 0.23, confidence: 0.82 },
    { detector: "news_detector", normalizedScore: 1.00, confidence: 0.90 },
    { detector: "session_detector", normalizedScore: 1.00, confidence: 0.75 }
];
function runTest() {
    const fusion = new fusionCore_1.FusionCore();
    const result = fusion.fuse(evidence);
    console.log("\n🧠 FUSION RESULT:");
    console.log("Shock Score:", result.shockScore.toFixed(4));
    console.log("State:", result.state);
    console.log("\n📊 CONTRIBUTIONS:");
    console.table(result.contributions);
}
runTest();
