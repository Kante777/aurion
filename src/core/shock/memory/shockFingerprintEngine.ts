import { ShockSnapshot } from "./shockMemoryStore";

export class ShockFingerprintEngine {

    compute(snapshot: ShockSnapshot) {

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
