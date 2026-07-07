export type Regime = "STABLE" | "ACTIVE" | "CRISIS";

export class RegimeMultiplier {
  static get(regime: Regime): number {
    switch (regime) {
      case "STABLE":
        return 0.8;

      case "ACTIVE":
        return 1.0;

      case "CRISIS":
        return 1.35;

      default:
        return 1.0;
    }
  }
}
