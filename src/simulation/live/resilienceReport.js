"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilienceReport = void 0;
class ResilienceReport {
    analyze(results) {
        let stabilityDrops = 0;
        let executionBlocks = 0;
        let sovereignBlocks = 0;
        for (const r of results) {
            if (r.stability?.report?.stable === false) {
                stabilityDrops++;
            }
            if (r.execution?.executed === false) {
                executionBlocks++;
            }
            if (r.sovereign?.locked?.locked === false) {
                sovereignBlocks++;
            }
        }
        const resilienceScore = 1 -
            (stabilityDrops + executionBlocks + sovereignBlocks) /
                Math.max(1, results.length * 3);
        return {
            resilienceScore,
            stabilityDrops,
            executionBlocks,
            sovereignBlocks,
            verdict: resilienceScore > 0.8
                ? "HIGHLY_STABLE"
                : resilienceScore > 0.5
                    ? "MODERATELY_STABLE"
                    : "UNSTABLE_SYSTEM"
        };
    }
}
exports.ResilienceReport = ResilienceReport;
