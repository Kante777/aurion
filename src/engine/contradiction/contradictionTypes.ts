import { Instrument } from "../../core/contracts/instrument";

export type ContradictionType =
  | "STRUCTURE_LIQUIDITY_CONFLICT"
  | "REGIME_NARRATIVE_CONFLICT"
  | "TIMEFRAME_DIVERGENCE"
  | "CROSS_ASSET_CONFLICT"
  | "NARRATIVE_BREAKDOWN";

export interface ContradictionEvent {
  id: string;

  instrument: Instrument;

  type: ContradictionType;

  severity: number; // 0–1

  description: string;

  affectedSystems: string[];

  timestamp: number;
}
