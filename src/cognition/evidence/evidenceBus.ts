import { ShockDetector } from "./ShockDetector";
import { ShockEvidence } from "./ShockEvidence";
import { SystemClock } from "@time/SystemClock";

export class EvidenceBus {

  constructor(
    private registry: { getAll(): ShockDetector[] },
    private clock: SystemClock
  ) {}

  // legacy alias (for tests)
  collect(marketData: unknown): ShockEvidence[] {
    return this.ingest(marketData);
  }

  ingest(marketData: unknown): ShockEvidence[] {

    const detectors = this.registry.getAll();
    const output: ShockEvidence[] = [];

    for (const detector of detectors) {
      try {
        const result = detector.detect(marketData);

        if (result) {
          (result as any).timestamp = this.clock.now();
          output.push(result);
        }

      } catch {
        continue;
      }
    }

    return output;
  }
}
