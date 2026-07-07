"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evidenceBus_1 = require("@evidence/evidenceBus");
const SystemClock_1 = require("@time/SystemClock");
const fusionCore_1 = require("../../fusion/fusionCore");
const AdaptiveEngine_1 = require("../fusion/AdaptiveEngine");
const registry = {
    getAll: () => [],
};
const clock = new SystemClock_1.SystemClock();
const bus = new evidenceBus_1.EvidenceBus(registry, clock);
const fusion = new fusionCore_1.FusionCore();
const adaptive = new AdaptiveEngine_1.AdaptiveEngine();
const sampleEvidence = [
    { detector: "volatility_detector", score: 0.78, confidence: 0.85 },
    { detector: "liquidity_detector", score: 0.70, confidence: 0.80 },
    { detector: "spread_detector", score: 0.54, confidence: 0.78 }
];
console.log("🧪 ADAPTATION TEST START");
const fused = fusion.fuse(sampleEvidence);
console.log("FUSED:", fused);
// AdaptiveEngine has no process method → use update()
console.log("ADAPTIVE:", adaptive.update({ error: 0.1 }));
bus.collect(sampleEvidence);
console.log("✔ TEST COMPLETE");
