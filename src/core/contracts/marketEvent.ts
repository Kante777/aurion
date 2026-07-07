export type MarketEventType =
  | "TRADE"
  | "SIMULATION"
  | "NEWS"
  | "BELIEF"
  | "CANDLE";

export interface MarketEvent {
  id: string;
  instrument: string;
  type: MarketEventType;

  timeframe?: string;   // FIX ADDED

  outcome?: string;
  payload?: any;

  timestamp: number;
}
