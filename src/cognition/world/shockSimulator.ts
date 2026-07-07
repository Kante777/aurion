
import { WorldEngine } from "./worldEngine";

export class ShockSimulator {

  constructor(private engine: WorldEngine) {}

  simulateFEDShock() {

    const propagation = this.engine.propagateShock("FED");

    return {
      event: "FED_RATE_HIKE",
      propagation,
      regimeImpact: "RISK_OFF"
    };
  }
}
