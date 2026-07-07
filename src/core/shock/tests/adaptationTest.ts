import { EvidenceBus } from "@evidence/evidenceBus";
import { SystemClock } from "@time/SystemClock";
import { FusionCore } from "../../fusion/fusionCore";
import { AdaptiveEngine } from "../fusion/AdaptiveEngine";

const registry: any = {
  getAll: () => [],
};

const clock = new SystemClock();

const bus = new EvidenceBus(registry, clock);
const fusion = new FusionCore();
const adaptive = new AdaptiveEngine();

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
