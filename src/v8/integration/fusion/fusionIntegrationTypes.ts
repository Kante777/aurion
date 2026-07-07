import { FusionEvidence, FusionResult } from "../../fusion/intelligence";

export interface FusionRuntimeInput {

  perception?: unknown;

  understanding?: unknown;

  reasoning?: unknown;

  actionContext?: unknown;

}


export interface FusionRuntimeOutput {

  evidence: FusionEvidence[];

  result: FusionResult;

  timestamp: number;

}
