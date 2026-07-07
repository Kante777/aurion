"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SovereigntyCore = void 0;
class SovereigntyCore {
    lockedDecisions = [];
    overrideAttempts = [];
    lockDecision(intent) {
        const decision = {
            id: `sovereign_${Date.now()}`,
            intent,
            locked: true,
            timestamp: Date.now()
        };
        this.lockedDecisions.push(decision);
        return decision;
    }
    attemptOverride(source, reason) {
        const attempt = {
            source,
            reason,
            severity: Math.random()
        };
        this.overrideAttempts.push(attempt);
        if (attempt.severity > 0.7) {
            return {
                allowed: false,
                status: "OVERRIDE_BLOCKED_BY_SOVEREIGNTY"
            };
        }
        return {
            allowed: true,
            status: "SOFT_OVERRIDE_ALLOWED"
        };
    }
    getReport() {
        const integrityScore = 1 -
            (this.overrideAttempts.reduce((s, a) => s + a.severity, 0) /
                Math.max(1, this.overrideAttempts.length));
        return {
            integrityScore,
            lockedDecisions: this.lockedDecisions,
            overrideAttempts: this.overrideAttempts
        };
    }
}
exports.SovereigntyCore = SovereigntyCore;
