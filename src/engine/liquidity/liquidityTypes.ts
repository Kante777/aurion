import { Instrument } from "../../core/contracts/instrument";

export type LiquidityEventType =
  | "SWEEP_HIGH"
  | "SWEEP_LOW"
  | "STOP_HUNT"
  | "LIQUIDITY_BUILDUP";

export interface LiquidityEvent {
  instrument: Instrument;

  type: LiquidityEventType;

  level: number;

  strength: number; // 0–1

  timeframe: string;

  timestamp: number;
}
