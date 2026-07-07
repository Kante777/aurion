"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockSimulator = void 0;
class ShockSimulator {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    simulateFEDShock() {
        const propagation = this.engine.propagateShock("FED");
        return {
            event: "FED_RATE_HIKE",
            propagation,
            regimeImpact: "RISK_OFF"
        };
    }
}
exports.ShockSimulator = ShockSimulator;
