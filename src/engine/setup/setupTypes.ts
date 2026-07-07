import { Instrument } from "../../core/contracts/instrument";

export type SetupDirection =
  | "BUY"
  | "SELL"
  | "NO_SETUP";

export interface Setup {
  id: string;

  instrument: Instrument;

  direction: SetupDirection;

  entryZone: {
    low: number;
    high: number;
  };

  stopLoss: number;

  takeProfit: number[];

  confidence: number; // 0–1

  confluenceScore: number; // 0–100

  reasoning: string[];

  createdAt: number;
}
