import {
  FusionIntelligenceEngine
} from "../../fusion/intelligence";

import {
  FusionPipelineAdapter
} from "./fusionPipelineAdapter";

import {
  FusionRuntimeInput,
  FusionRuntimeOutput
} from "./fusionIntegrationTypes";


import type {
  CognitivePhase
} from "../../contracts/cognition";


const PERCEPTION_PHASE =
"PERCEPTION" as CognitivePhase;

const UNDERSTANDING_PHASE =
"UNDERSTANDING" as CognitivePhase;

const REASONING_PHASE =
"REASONING" as CognitivePhase;



export class FusionRuntimeBridge {


private engine =
new FusionIntelligenceEngine();


private adapter =
new FusionPipelineAdapter();



execute(
 input:FusionRuntimeInput
):FusionRuntimeOutput {


const evidence = [

...this.adapter.adaptMany(
 input.perception,
 PERCEPTION_PHASE,
 "perception"
),


...this.adapter.adaptMany(
 input.understanding,
 UNDERSTANDING_PHASE,
 "understanding"
),


...this.adapter.adaptMany(
 input.reasoning,
 REASONING_PHASE,
 "reasoning"
)

];


const result =
this.engine.process(
 evidence
);



return {

evidence,

result,

timestamp:
Date.now()

};


}


}
