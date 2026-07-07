"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactAnalyzer = void 0;
class ImpactAnalyzer {
    computeBaseline(fusion) {
        return fusion.shockScore;
    }
    // simulate removal of one detector
    computeWithout(detectorName, evidence) {
        const filtered = evidence.filter(e => e.detector !== detectorName);
        if (filtered.length === 0)
            return 0;
        // simplified re-fusion approximation
        const sum = filtered.reduce((acc, e) => acc + (e.score * e.confidence), 0);
        const total = filtered.reduce((acc, e) => acc + e.confidence, 0);
        return total === 0 ? 0 : sum / total;
    }
    computeImpact(detectorName, fusion, evidence) {
        const baseline = this.computeBaseline(fusion);
        const without = this.computeWithout(detectorName, evidence);
        return Math.abs(baseline - without);
    }
}
exports.ImpactAnalyzer = ImpactAnalyzer;
