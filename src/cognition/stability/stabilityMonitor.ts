
import { StabilityKernel } from "./stabilityKernel";

export class StabilityMonitor {

  constructor(private kernel: StabilityKernel) {}

  run(systemState: any) {

    const report = this.kernel.checkConsistency(systemState);
    const resolution = this.kernel.resolve(report);

    return {
      timestamp: Date.now(),
      report,
      resolution,
      status:
        report.stable
          ? "COHERENT"
          : "INCONSISTENT_STATE_DETECTED"
    };
  }
}
