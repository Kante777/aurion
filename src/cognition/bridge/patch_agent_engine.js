"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitAgentEvidence = emitAgentEvidence;
function emitAgentEvidence(bridge, instrument, agentId, bias, confidence) {
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
