import { Instrument } from "../../core/contracts/instrument";

export interface ExecutionCandidate {
  id: string;

  instrument: Instrument;

  direction: "BUY" | "SELL";

  entry: number;

  stopLoss: number;

  takeProfit: number[];

  riskPercent: number;

  positionSize: number;

  rrRatio: number;

  confidence: number;

  executionScore: number;

  reasoning: string[];

  timestamp: number;
}
