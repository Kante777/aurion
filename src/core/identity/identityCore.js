"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityCore = void 0;
class IdentityCore {
    state = {
        version: 1,
        coherence: 1,
        memoryStrength: 1,
        stabilityScore: 1,
        evolutionPressure: 0
    };
    updateIdentity(update) {
        const decay = 0.995;
        // 🔥 ADD THIS LINE
        const equilibrium = 0.88;
        const signalForce = update.coherenceDelta * 0.28;
        const meanReversion = (equilibrium - this.state.coherence) * 0.04;
        // 🔥 noise floor (prevents deterministic collapse)
        const noise = (Math.random() - 0.5) * 0.01;
        // apply full update
        this.state.coherence += signalForce + meanReversion + noise;
        // bounds
        this.state.coherence = Math.max(0, Math.min(1, this.state.coherence));
        // stability becomes dynamic balance metric
        this.state.stabilityScore =
            1 - Math.abs(equilibrium - this.state.coherence);
        // evolution pressure increases on instability OR stagnation
        this.state.evolutionPressure =
            Math.abs(update.coherenceDelta) + Math.abs(0.5 - this.state.coherence);
        this.state.version += 1;
    }
    driftMemory = [];
    detectDrift(signal) {
        // 🔥 SEPARATE SIGNAL DIMENSIONS
        const volatility = signal?.noise ?? 0.5;
        const directionSignal = signal?.coherenceDelta ?? 0;
        const coherence = this.state.coherence;
        // 🔥 1. volatility pressure (pure market chaos)
        const volatilityShock = volatility > 0.82; // was 0.85 (slightly more sensitive)
        // 🔥 2. structural fragility (state-based, NOT signal-based)
        const fragility = coherence < 0.94; // was 0.92 (earlier detection zone)
        // 🔥 3. directional instability (trend reversal pressure)
        const directionalInstability = Math.abs(directionSignal) > 0.15; // was 0.2
        // 🔥 RAW drift event
        const rawDrift = volatilityShock &&
            fragility &&
            directionalInstability;
        // 🔥 MEMORY LAYER
        this.driftMemory.push(rawDrift ? 1 : 0);
        if (this.driftMemory.length > 5) {
            this.driftMemory.shift();
        }
        const persistence = this.driftMemory.reduce((a, b) => a + b, 0) / this.driftMemory.length;
        // 🔥 FINAL DECISION (strict + memory gated)
        const weightedScore = (volatilityShock ? 0.4 : 0) +
            (fragility ? 0.35 : 0) +
            (directionalInstability ? 0.25 : 0);
        const temporalBoost = persistence * 0.35; // reduced memory dominance
        return (weightedScore + temporalBoost) >= 0.55;
    }
    getState() {
        return this.state;
    }
    snapshot() {
        const drift = this.detectDrift({});
        return {
            timestamp: Date.now(),
            state: this.state,
            driftDetected: drift
        };
    }
}
exports.IdentityCore = IdentityCore;
