export type EvidenceSource =
  | "TEMPORAL"
  | "CAUSAL"
  | "GRAPH"
  | "REGIME"
  | "NEWS"
  | "AGENT"
  | "FEEDBACK"
  | "CORRELATION";

export type EvidenceCategory =
  | "TREND"
  | "BIAS"
  | "LIQUIDITY"
  | "VOLATILITY"
  | "STRUCTURE"
  | "CAUSALITY"
  | "RISK";

export interface Evidence {
  id: string;
  source: EvidenceSource;
  instrument: string;
  category: EvidenceCategory;
  value: number;
  confidence: number;
  timestamp: number;
  explanation: string;
  metadata?: Record<string, unknown>;
}
