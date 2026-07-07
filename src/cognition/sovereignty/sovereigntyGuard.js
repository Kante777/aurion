"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SovereigntyGuard = void 0;
class SovereigntyGuard {
    core;
    constructor(core) {
        this.core = core;
    }
    enforce(systemIntent) {
        const locked = this.core.lockDecision(systemIntent);
        return {
            timestamp: Date.now(),
            locked,
            status: "SOVEREIGN_INTENT_LOCKED"
        };
    }
    validateOverride(source, reason) {
        return this.core.attemptOverride(source, reason);
    }
    report() {
        return this.core.getReport();
    }
}
exports.SovereigntyGuard = SovereigntyGuard;
