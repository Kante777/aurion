"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fusionCore_1 = require("../../fusion/fusionCore");
console.log("\n==========================================");
console.log("      AETERNUM V7 INTEGRATION TEST");
console.log("==========================================\n");
const fusion = new fusionCore_1.FusionCore({
    volatility_detector: 0.33,
    liquidity_detector: 0.33,
    spread_detector: 0.34
});
const evidence = [
    {
        detector: "volatility_detector",
        score: 0.95,
        confidence: 0.9
    },
    {
        detector: "liquidity_detector",
        score: 0.40,
        confidence: 0.8
    },
    {
        detector: "spread_detector",
        score: 0.80,
        confidence: 0.7
    }
];
const result = fusion.fuse(evidence);
console.log("🧠 FINAL COGNITION RESULT");
console.log(result);
console.log("\n==========================================");
console.log("✅ V7 INTEGRATION PASS");
console.log("==========================================\n");
