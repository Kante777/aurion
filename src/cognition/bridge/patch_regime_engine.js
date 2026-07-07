"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitRegimeEvidence = emitRegimeEvidence;
function emitRegimeEvidence(bridge, regime) {
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
