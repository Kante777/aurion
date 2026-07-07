"use strict";
// TEMPORAL ENGINE → EVIDENCE PRODUCER
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitTemporalEvidence = emitTemporalEvidence;
// ADD IN CONSTRUCTOR:
// constructor(private bridge: EngineBridge) {}
function emitTemporalEvidence(bridge, instrument, leadScore, lagScore) {
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
