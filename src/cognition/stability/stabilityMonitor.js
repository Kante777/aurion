"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StabilityMonitor = void 0;
class StabilityMonitor {
    kernel;
    constructor(kernel) {
        this.kernel = kernel;
    }
    run(systemState) {
        const report = this.kernel.checkConsistency(systemState);
        const resolution = this.kernel.resolve(report);
        return {
            timestamp: Date.now(),
            report,
            resolution,
            status: report.stable
                ? "COHERENT"
                : "INCONSISTENT_STATE_DETECTED"
        };
    }
}
exports.StabilityMonitor = StabilityMonitor;
