export type CognitivePhase =
  | "PERCEPTION"
  | "UNDERSTANDING"
  | "REASONING"
  | "ACTION";


export interface CognitiveContext {
  timestamp: number;
  instrument: string;
  timeframe: string;
  metadata?: Record<string, unknown>;
}


export interface CognitiveInput<T = unknown> {
  phase: CognitivePhase;
  context: CognitiveContext;
  payload: T;
}


export interface CognitiveEvidence {
  source: string;
  confidence: number;
  value: unknown;
}


export interface CognitiveOutput<T = unknown> {
  phase: CognitivePhase;
  confidence: number;
  result: T;
  evidence: CognitiveEvidence[];
}


export interface CognitiveModule<I, O> {
  execute(input: CognitiveInput<I>): Promise<CognitiveOutput<O>>;
}
