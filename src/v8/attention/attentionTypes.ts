
export type AttentionPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";


export interface CognitiveSignal {

  id:string;

  source:string;

  description:string;

  impact:number;

  urgency:number;

  novelty:number;

  confidence:number;

}


export interface AttentionResult {

  signalId:string;

  score:number;

  priority:AttentionPriority;

}


