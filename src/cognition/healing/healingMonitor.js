"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealingMonitor = void 0;
class HealingMonitor {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    run(systemSnapshot) {
        const health = this.engine.runHealingCycle(systemSnapshot);
        return {
            timestamp: Date.now(),
            health,
            status: health.overallHealth > 0.8
                ? "HEALTHY"
                : health.overallHealth > 0.5
                    ? "DEGRADED"
                    : "CRITICAL_REPAIR_MODE"
        };
    }
}
exports.HealingMonitor = HealingMonitor;
