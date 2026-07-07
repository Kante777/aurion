import { Instrument } from "../../core/contracts/instrument";

export type StructureType =
  | "BOS_BULLISH"
  | "BOS_BEARISH"
  | "CHOCH_BULLISH"
  | "CHOCH_BEARISH"
  | "NONE";

export interface StructureEvent {
  instrument: Instrument;

  type: StructureType;

  level: number;

  strength: number;

  timeframe: string;

  timestamp: number;
}
