
export interface FragilityNode {
  instrument: string;
  fragilityScore: number;   // 0 - stable, 1 - extremely fragile
  liquidityDepth: number;
  volatilityExposure: number;
}

export interface CascadeEvent {
  from: string;
  to: string;
  delay: number;
  amplification: number;
}

export interface CrisisForecast {
  probability: number;
  timeToImpact: number;
  weakestLink: string;
  cascadeChain: CascadeEvent[];
}
