"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceFusionEngine = void 0;
class EvidenceFusionEngine {
    getDirection(value) {
        if (value > 0.15)
            return "BUY";
        if (value < -0.15)
            return "SELL";
        return "NEUTRAL";
    }
    fuse(instrument, evidenceList) {
        let score = 0;
        let confidence = 0;
        const supporting = [];
        const contradicting = [];
        for (const e of evidenceList) {
            const weighted = e.value * e.confidence;
            score += weighted;
            confidence += e.confidence;
            if (e.value > 0)
                supporting.push(e);
            if (e.value < 0)
                contradicting.push(e);
        }
        const avgConfidence = evidenceList.length
            ? confidence / evidenceList.length
            : 0;
        const direction = this.getDirection(score);
        return {
            instrument,
            direction,
            confidence: avgConfidence,
            strength: score,
            supportingEvidence: supporting,
            contradictingEvidence: contradicting
        };
    }
}
exports.EvidenceFusionEngine = EvidenceFusionEngine;
