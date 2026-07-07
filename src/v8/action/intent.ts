export type IntentType =
  | "OBSERVE"
  | "MONITOR"
  | "PREPARE"
  | "ESCALATE"
  | "BLOCK";


export type RiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH";


export interface CognitiveIntent {

  intent: IntentType;

  direction:
    | "BULLISH"
    | "BEARISH"
    | "NEUTRAL";


  confidence: number;

  risk: RiskLevel;

  reasons: string[];

  timestamp: number;
}
