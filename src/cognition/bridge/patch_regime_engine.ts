export function emitRegimeEvidence(bridge: any, regime: string) {
  bridge.emit({
    source: "REGIME",
    instrument: "GLOBAL",
    category: "RISK",
    value: regime === "RISK_OFF" ? -1 : 1,
    confidence: 0.75,
    explanation: `Market regime detected: ${regime}`,
    metadata: { regime }
  });
}
