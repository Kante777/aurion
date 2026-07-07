export interface PriceState {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}


export interface VolatilityState {
  value: number;
  level: "LOW" | "NORMAL" | "HIGH" | "EXTREME";
}


export interface LiquidityState {
  value: number;
  condition:
    | "THIN"
    | "NORMAL"
    | "DEEP";
}


export interface SessionContext {
  name:
    | "ASIA"
    | "LONDON"
    | "NEW_YORK"
    | "OVERLAP"
    | "UNKNOWN";

  active: boolean;
}


export interface MarketSnapshot {

  instrument: string;

  timeframe: string;

  timestamp: number;

  price: PriceState;

  volatility: VolatilityState;

  liquidity: LiquidityState;

  session: SessionContext;
}
