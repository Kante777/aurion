export interface CognitionTelemetryEvent {
  phase: string;
  timestamp: number;
  confidence: number;
  status: "SUCCESS" | "FAILURE";
  metadata?: Record<string, unknown>;
}

export class CognitionTelemetry {
  private events: CognitionTelemetryEvent[] = [];

  emit(event: CognitionTelemetryEvent): void {
    this.events.push(event);
  }

  history(): CognitionTelemetryEvent[] {
    return [...this.events];
  }

  latest(): CognitionTelemetryEvent | undefined {
    return this.events[this.events.length - 1];
  }
}
