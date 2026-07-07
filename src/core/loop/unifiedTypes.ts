
export interface MarketTick {
  instrument: string;
  price: number;
  timestamp: number;
}

export interface SystemSnapshot {
  market: MarketTick[];
  cognition: any;
  fusion: any;
  stability: any;
  healing: any;
  sovereignty: any;
}

export interface LoopResult {
  decision: any;
  execution: any;
  health: any;
  stability: any;
  sovereign: any;
}
