import { DetectorRegistry } from "../../core/shock/fusion/detectorRegistry";
import { EvidenceBus } from "../../cognition/evidence/evidenceBus";
import { SystemClock } from "../../time/SystemClock";
import { FusionCore } from "../../core/fusion/fusionCore";

// ----------------------
// MOCK DETECTORS
// ----------------------

class MockVolatilityDetector {
  name = "volatility_detector";

  detect(input: any) {
    return {
      detector: this.name,
      metric: "volatility",
      rawValue: input.volatility ?? 0,
      normalizedScore: input.volatility ?? 0,
      confidence: 0.9,
      explanation: "Mock volatility signal",
      timestamp: 0
    };
  }
}

class MockLiquidityDetector {
  name = "liquidity_detector";

  detect(input: any) {
    return {
      detector: this.name,
      metric: "liquidity",
      rawValue: input.liquidity ?? 0,
      normalizedScore: input.liquidity ?? 0,
      confidence: 0.85,
      explanation: "Mock liquidity signal",
      timestamp: 0
    };
  }
}

// ----------------------
// TEST RUN
// ----------------------

function run() {
  console.log("\n🧪 AETERNUM SYSTEM VALIDATION START\n");

  const registry = new DetectorRegistry();
  const clock = new SystemClock();

  registry.register(new MockVolatilityDetector());
  registry.register(new MockLiquidityDetector());

  const bus = new EvidenceBus(registry, clock);
  const fusion = new FusionCore();

  const snapshot = {
    volatility: 0.72,
    liquidity: 0.63
  };

  console.log("📡 STEP 1: Evidence Collection");
  const evidence = bus.collect(snapshot);
  console.table(evidence);

  console.log("\n🧠 STEP 2: Fusion Engine");
  const fused: any = fusion.fuse(evidence);
  console.log(fused);

  console.log("\n📊 STEP 3: System Health Check");

  const validEvidence = evidence.every(e =>
    typeof e.normalizedScore === "number" &&
    typeof e.confidence === "number"
  );

  const validFusion = typeof fused.shockScore === "number";

  console.log({
    evidenceIntegrity: validEvidence,
    fusionIntegrity: validFusion,
    systemStatus: validEvidence && validFusion ? "STABLE" : "UNSTABLE"
  });

  console.log("\n✅ VALIDATION COMPLETE\n");
}

run();
