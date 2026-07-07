import { Instrument } from "../contracts/instrument";
import { Timeframe } from "@timeframe";

export interface TimeframeNode {
  timeframe: Timeframe;
  candles: any[];
  structure: "BULLISH" | "BEARISH" | "RANGE" | "UNKNOWN";
}

export interface MarketStateTree {
  instrument: Instrument;

  nodes: Record<Timeframe, TimeframeNode>;

  bias: "BULLISH" | "BEARISH" | "NEUTRAL";

  regime: "TRENDING" | "RANGING" | "VOLATILE" | "UNKNOWN";

  lastUpdated: number;
}
