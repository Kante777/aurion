export type MarketTrend =
  | "BULLISH"
  | "BEARISH"
  | "NEUTRAL";


export type MarketStructure =
  | "EXPANSION"
  | "CONSOLIDATION"
  | "TRANSITION";


export type LiquidityCondition =
  | "ACCUMULATING"
  | "DISTRIBUTING"
  | "BALANCED";


export type RegimeContext =
  | "NORMAL"
  | "VOLATILE"
  | "LIQUIDITY_DRIVEN"
  | "UNCERTAIN";


export interface MarketState {

  instrument: string;

  timeframe: string;

  trend: MarketTrend;

  structure: MarketStructure;

  liquidity: LiquidityCondition;

  regime: RegimeContext;

  confidence: number;

  timestamp: number;
}
