import type {
  CognitivePhase
} from "../../contracts/cognition";


export interface CognitiveCycleContext {

  cycleId:string;

  currentPhase:CognitivePhase;

  input:unknown;

  startedAt:number;

  metadata?:Record<string,unknown>;

}
