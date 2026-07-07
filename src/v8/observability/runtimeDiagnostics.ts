import { RuntimeMetricsTracker } from "./runtimeMetrics";
import { CognitionTelemetry } from "./cognitionTelemetry";

export class RuntimeDiagnostics {
  constructor(
    private metrics: RuntimeMetricsTracker,
    private telemetry: CognitionTelemetry
  ) {}

  report() {
    return {
      metrics: this.metrics.snapshot(),
      latestEvent: this.telemetry.latest(),
      eventCount: this.telemetry.history().length
    };
  }
}
