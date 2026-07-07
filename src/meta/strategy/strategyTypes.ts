
export interface StrategyDNA {
  id: string;
  name: string;
  conditions: string[];
  riskProfile: number;
  expectedEdge: number;
  usageCount: number;
  successRate: number;
}

export interface StrategySignal {
  strategyId: string;
  confidence: number;
  direction: "BUY" | "SELL";
}

export interface StrategyPerformance {
  strategyId: string;
  win: boolean;
  pnl: number;
}
