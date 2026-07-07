export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface SimulationResult {
  instrument: string;

  totalTrades: number;
  wins: number;
  losses: number;

  netProfit: number;

  maxDrawdown: number;

  winRate: number;

  agentPerformance: Record<string, any>;
}
