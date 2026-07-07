export enum CognitivePhase {

  PERCEPTION = "PERCEPTION",

  UNDERSTANDING = "UNDERSTANDING",

  REASONING = "REASONING",

  ACTION = "ACTION",

  REFLECTION = "REFLECTION",

  MEMORY = "MEMORY"

}


export interface PipelineTransition {

  from: CognitivePhase;

  to: CognitivePhase;

}
