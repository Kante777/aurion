
export interface BehavioralSignature {
  instrument: string;
  compressionScore: number;     // volatility compression
  liquidityTrapScore: number;   // fake stability
  institutionalPressure: number; // hidden accumulation
  breakoutProbability: number;
}

export interface MarketFingerprint {
  regime: "STABLE" | "FAKE_STABLE" | "PRE_BREAKOUT" | "EXPANSION";
  confidence: number;
  triggers: string[];
}
