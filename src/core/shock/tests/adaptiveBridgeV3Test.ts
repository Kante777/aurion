import { FusionCore } from "../../fusion/fusionCore";

const fusion = new FusionCore();

/**
 * FIX: EvidencePoint must include confidence
 */
const evidence = [
  { detector: "volatility_detector", score: 0.8, confidence: 0.9 },
  { detector: "liquidity_detector", score: 0.6, confidence: 0.8 },
  { detector: "spread_detector", score: 0.7, confidence: 0.7 }
];

const result: any = fusion.fuse(evidence);

const learning = fusion.getBridge().applyOutcome(
  "STABLE",
  evidence,
  result
);

console.log("\n🧠 FUSION RESULT:");
console.log(result);

console.log("\n📊 LEARNING RESULT:");
console.log(learning);

console.log("\n📦 FINAL WEIGHTS:");
console.log(fusion.getBridge().getWeights());
