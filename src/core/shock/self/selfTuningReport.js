"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfTuningReport = void 0;
class SelfTuningReport {
    analyze(results) {
        const issues = [];
        const nanCount = results.filter(r => isNaN(Number(r.shockScore))).length;
        if (nanCount > 0) {
            issues.push({
                type: "NUMERIC_INSTABILITY",
                severity: "HIGH",
                count: nanCount
            });
        }
        return {
            stabilityScore: 1 - nanCount / results.length,
            issues,
            recommendation: nanCount > 0
                ? "Add defensive guards in fusion pipeline"
                : "System stable"
        };
    }
}
exports.SelfTuningReport = SelfTuningReport;
