
export interface TradeIntent {
  instrument: string;
  direction: "BUY" | "SELL";
  confidence: number;
  riskLevel: number;
  reason: string;
}

export interface Position {
  id: string;
  instrument: string;
  direction: "BUY" | "SELL";
  size: number;
  entryPrice: number;
  status: "OPEN" | "CLOSED";
}

export interface ExecutionResult {
  executed: boolean;
  position?: Position;
  slippage?: number;
  reason?: string;
}
