import { Evidence } from "../evidence/evidenceTypes";

export type Direction = "BUY" | "SELL" | "NEUTRAL";

export interface BeliefState {
  instrument: string;
  direction: Direction;
  confidence: number;
  strength: number;

  supportingEvidence: Evidence[];
  contradictingEvidence: Evidence[];

  metadata?: {
    createdAt?: number;
    source?: string;
  };
}

export interface FusionInput {
  portfolio: any;
  world: any;
  shock: any;
  crisis: any;
  behavioral: any;
}

export interface FusionDecision {
  marketState: "STABLE" | "FRAGILE" | "CRISIS" | "EXPANSION";
  riskLevel: number;
  opportunityScore: number;
  dominantSignal: string;
  confidence: number;
  actions: string[];
}
