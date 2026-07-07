import { Instrument } from "../../core/contracts/instrument";

export type MarketRegimeType =
  | "TRENDING_UP"
  | "TRENDING_DOWN"
  | "RANGING"
  | "COMPRESSION"
  | "EXPANSION"
  | "UNKNOWN";

export interface MarketRegime {
  instrument: Instrument;

  type: MarketRegimeType;

  strength: number; // 0–1 confidence

  volatility: number;

  momentum: number;

  timestamp: number;
}
