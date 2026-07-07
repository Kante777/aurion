export function emitCausalEvidence(bridge: any, cause: string, effect: string, strength: number) {
  bridge.emit({
    source: "CAUSAL",
    instrument: cause,
    category: "CAUSALITY",
    value: strength,
    confidence: strength,
    explanation: `${cause} → ${effect} causal relationship`,
    metadata: { effect }
  });
}
