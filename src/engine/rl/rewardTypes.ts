export interface RewardSignal {
  id: string;

  source: "TRADE" | "AGENT" | "BELIEF" | "NEWS_RESPONSE";

  instrument: string;

  reward: number; // -1 to +1

  confidence: number;

  timestamp: number;
}

export interface WeightUpdate {
  target: string;

  currentWeight: number;

  adjustedWeight: number;

  delta: number;
}
