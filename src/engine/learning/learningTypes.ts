import { Instrument } from "../../core/contracts/instrument";

export type OutcomeType =
  | "TP_HIT"
  | "SL_HIT"
  | "BREAKEVEN"
  | "MANUAL_EXIT"
  | "INVALIDATED";

export interface TradeOutcome {
  id: string;

  instrument: Instrument;

  executionId: string;

  outcome: OutcomeType;

  profitLoss: number;

  maxFavorableExcursion: number;

  maxAdverseExcursion: number;

  duration: number; // in ms

  timestamp: number;
}

export interface PatternPerformance {
  patternId: string;

  winRate: number;

  averageRR: number;

  sampleSize: number;

  confidence: number;
}

export interface BeliefPerformance {
  beliefType: string;

  accuracy: number;

  avgConfidence: number;

  totalOccurrences: number;
}
