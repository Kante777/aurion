export type MarketRegime =
  | "STABLE"
  | "VOLATILE"
  | "TRENDING"
  | "RANGING"
  | "MANIPULATION";

export interface RegimeState {
  regime: MarketRegime;
  confidence: number;
  volatilityIndex: number;
  liquidityStress: number;
  spreadStress: number;
}
