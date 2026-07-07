export interface ShockSnapshot {
    shockScore: number;
    previousShockScore: number;

    acceleration: number; // rate of change
    divergence: number;   // internal disagreement score

    state: "CALM" | "ACTIVE" | "CRITICAL";

    earlyWarning: boolean;
}
