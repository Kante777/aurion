export type NewsImpact = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type MarketBias = "RISK_ON" | "RISK_OFF" | "NEUTRAL";

export interface NewsEvent {
  id: string;

  title: string;
  description: string;

  source: string;
  timestamp: number;

  impact: NewsImpact;

  bias: MarketBias;

  affectedAssets: string[];
}
