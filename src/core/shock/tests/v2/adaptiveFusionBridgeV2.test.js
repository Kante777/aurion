"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptiveFusionBridgeV2_1 = require("../../adaptive/v2/adaptiveFusionBridgeV2");
const bridge = new adaptiveFusionBridgeV2_1.AdaptiveFusionBridgeV5V5V2({
    volatility_detector: 0.1,
    liquidity_detector: 0.1,
    spread_detector: 0.1
});
const evidence = [
    { detector: "volatility_detector", normalizedScore: 0.7 },
    { detector: "liquidity_detector", normalizedScore: 0.6 },
    { detector: "spread_detector", normalizedScore: 0.4 }
];
const fusion = {
    shockScore: 0.72,
    predictedState: "ACTIVE",
    confidence: 0.9
};
bridge.recordFusion(evidence, fusion);
const result = bridge.applyOutcome("STABLE", evidence, fusion);
console.log("\n🧠 V2 RESULT:");
console.table(result);
console.log("\n📊 FINAL WEIGHTS:");
console.table(bridge.getWeights());
console.log("\n🧠 MEMORY:");
console.log(bridge.getMemory());
