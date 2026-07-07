// TEMPORAL ENGINE → EVIDENCE PRODUCER

// ADD IN CONSTRUCTOR:
// constructor(private bridge: EngineBridge) {}

export function emitTemporalEvidence(bridge: any, instrument: string, leadScore: number, lagScore: number) {
  bridge.emit({
    source: "TEMPORAL",
    instrument,
    category: "TREND",
    value: leadScore,
    confidence: 0.8,
    explanation: "Temporal lead strength detected",
    metadata: { lagScore }
  });
}
