import {
  FusionEvidence
} from "../../fusion/intelligence";

import {
  CognitivePhase
} from "../../contracts/cognition";


export class FusionPipelineAdapter {


  adapt(
    input: unknown,
    phase: CognitivePhase,
    source: string
  ): FusionEvidence {


    return {

      phase,

      source,

      confidence: 1,

      strength: 1,

      payload: input,

      timestamp: Date.now()

    };

  }


  adaptMany(
    input: unknown,
    phase: CognitivePhase,
    source: string
  ): FusionEvidence[] {


    return [
      this.adapt(
        input,
        phase,
        source
      )
    ];

  }

}
