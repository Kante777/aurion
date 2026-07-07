"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrisisMonitor = void 0;
class CrisisMonitor {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    run() {
        const forecast = this.engine.forecastCrisis();
        return {
            timestamp: Date.now(),
            crisis: forecast,
            alert: forecast.probability > 0.7
                ? "CRISIS_IMMINENT"
                : forecast.probability > 0.4
                    ? "SYSTEM_FRAGILE"
                    : "STABLE_SYSTEM"
        };
    }
}
exports.CrisisMonitor = CrisisMonitor;
