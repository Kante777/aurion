"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNewsEvidence = emitNewsEvidence;
function emitNewsEvidence(bridge, instrument, title, impact) {
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
