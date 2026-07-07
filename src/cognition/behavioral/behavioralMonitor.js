"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehavioralMonitor = void 0;
class BehavioralMonitor {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    run() {
        const fingerprint = this.engine.classifyMarket();
        return {
            timestamp: Date.now(),
            fingerprint,
            alert: fingerprint.regime === "PRE_BREAKOUT"
                ? "BREAKOUT_WARNING"
                : fingerprint.regime === "FAKE_STABLE"
                    ? "LIQUIDITY_TRAP_RISK"
                    : "NORMAL_CONDITIONS"
        };
    }
}
exports.BehavioralMonitor = BehavioralMonitor;
