export function emitAgentEvidence(
  bridge: any,
  instrument: string,
  agentId: string,
  bias: string,
  confidence: number
) {
  bridge.emit({
    source: "AGENT",
    instrument,
    category: "STRUCTURE",
    value: confidence,
    confidence,
    explanation: `Agent ${agentId}: ${bias}`,
    metadata: { agentId, bias }
  });
}
