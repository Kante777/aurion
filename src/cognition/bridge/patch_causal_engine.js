"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitCausalEvidence = emitCausalEvidence;
function emitCausalEvidence(bridge, cause, effect, strength) {
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
