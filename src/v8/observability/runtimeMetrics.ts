export interface RuntimeMetrics {
  cycles: number;
  successfulCycles: number;
  failedCycles: number;
  averageConfidence: number;
  lastExecution: number;
}

export class RuntimeMetricsTracker {
  private metrics: RuntimeMetrics = {
    cycles: 0,
    successfulCycles: 0,
    failedCycles: 0,
    averageConfidence: 0,
    lastExecution: 0
  };

  record(success: boolean, confidence: number): void {
    this.metrics.cycles++;

    if (success) {
      this.metrics.successfulCycles++;
    } else {
      this.metrics.failedCycles++;
    }

    this.metrics.averageConfidence =
      ((this.metrics.averageConfidence *
        (this.metrics.cycles - 1)) +
        confidence) /
      this.metrics.cycles;

    this.metrics.lastExecution = Date.now();
  }

  snapshot(): RuntimeMetrics {
    return {
      ...this.metrics
    };
  }
}
