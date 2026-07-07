"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockFingerprintEngine = void 0;
class ShockFingerprintEngine {
    compute(snapshot) {
        return {
            intensity: snapshot.shockScore,
            momentum: snapshot.acceleration,
            instability: snapshot.divergence,
            regime: snapshot.state,
            // 🔥 compact fingerprint vector
            vector: [
                snapshot.shockScore,
                snapshot.acceleration,
                snapshot.divergence
            ]
        };
    }
}
exports.ShockFingerprintEngine = ShockFingerprintEngine;
