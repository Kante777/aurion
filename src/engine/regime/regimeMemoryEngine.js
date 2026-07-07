"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeMemoryEngine = void 0;
class RegimeMemoryEngine {
    memory = new Map([
        ["RISK_ON", {
                correlationBias: 1.1,
                leadBias: 1.0,
                volatilitySensitivity: 0.8,
                accuracy: 0.5,
                samples: 0
            }],
        ["RISK_OFF", {
                correlationBias: 1.3,
                leadBias: 1.2,
                volatilitySensitivity: 1.2,
                accuracy: 0.5,
                samples: 0
            }],
        ["MIXED", {
                correlationBias: 1.0,
                leadBias: 1.0,
                volatilitySensitivity: 1.0,
                accuracy: 0.5,
                samples: 0
            }]
    ]);
    /**
     * Update regime-specific learning
     */
    update(regime, correct) {
        const state = this.memory[regime];
        state.samples += 1;
        if (correct) {
            state.accuracy = (state.accuracy * (state.samples - 1) + 1) / state.samples;
        }
        else {
            state.accuracy = (state.accuracy * (state.samples - 1)) / state.samples;
        }
    }
    /**
     * Get regime profile
     */
    get(regime) {
        return this.memory.get(regime);
    }
    /**
     * Apply regime scaling
     */
    scale(regime, value, type) {
        const profile = this.memory.get(regime);
        if (!profile)
            return value;
        if (type === "correlation") {
            return value * profile.correlationBias;
        }
        return value * profile.leadBias;
    }
    clamp(profile) {
        profile.correlationBias = Math.max(0.5, Math.min(1.8, profile.correlationBias));
        profile.leadBias = Math.max(0.5, Math.min(1.8, profile.leadBias));
        profile.volatilitySensitivity = Math.max(0.5, Math.min(2, profile.volatilitySensitivity));
    }
    /**
     * Debug view
     */
    snapshot() {
        return Object.fromEntries(this.memory.entries());
    }
}
exports.RegimeMemoryEngine = RegimeMemoryEngine;
