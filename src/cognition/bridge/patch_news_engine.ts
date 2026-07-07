export function emitNewsEvidence(bridge: any, instrument: string, title: string, impact: string) {
  bridge.emit({
    source: "NEWS",
    instrument,
    category: "BIAS",
    value: impact === "HIGH" ? -1 : -0.5,
    confidence: 0.7,
    explanation: title,
    metadata: { impact }
  });
}
