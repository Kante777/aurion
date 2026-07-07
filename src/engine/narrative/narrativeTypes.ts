import { Instrument } from "../../core/contracts/instrument";

export type NarrativeType =
  | "BULLISH_CONTINUATION"
  | "BEARISH_CONTINUATION"
  | "REVERSAL_BULLISH"
  | "REVERSAL_BEARISH"
  | "ACCUMULATION"
  | "DISTRIBUTION"
  | "RANGE_CONSOLIDATION"
  | "UNKNOWN";

export type NarrativeState =
  | "FORMATION"
  | "CONFIRMATION"
  | "EXPANSION"
  | "CONTRADICTION"
  | "INVALIDATED"
  | "COMPLETED";

export interface Narrative {
  id: string;

  instrument: Instrument;

  type: NarrativeType;

  state: NarrativeState;

  confidence: number; // 0–1

  supportingEvidence: string[];

  contradictingEvidence: string[];

  createdAt: number;

  updatedAt: number;
}
