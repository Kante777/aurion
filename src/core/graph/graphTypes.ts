import { Instrument } from "../contracts/instrument";

export interface MarketNode {
  instrument: Instrument;

  lastPrice?: number;

  volatilityScore: number;

  regime: "TRENDING" | "RANGING" | "VOLATILE" | "UNKNOWN";
}

export interface MarketEdge {
  from: Instrument;
  to: Instrument;

  influence: number; // 0–1

  direction: "LEADS" | "LAGS" | "SYNC";

  latencyMs: number;

  strength: number;

  lastUpdated: number;
}
