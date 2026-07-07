import { Instrument } from "../../core/contracts/instrument";

export type BeliefType =
  | "BULLISH_CONTINUATION"
  | "BEARISH_CONTINUATION"
  | "REVERSAL_BULLISH"
  | "REVERSAL_BEARISH"
  | "RANGE_BOUND"
  | "UNKNOWN";

export interface Belief {
  id: string;

  instrument: Instrument;

  type: BeliefType;

  confidence: number; // 0–1

  supportingEvidence: string[];

  contradictingEvidence: string[];

  decay: number; // how fast belief loses validity

  lastUpdated: number;
}
