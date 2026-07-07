import {
CognitivePhase
}
from "./pipelineTypes";


import {
PhaseValidator
}
from "./phaseValidator";


import {
PhaseExecutor
}
from "./phaseExecutor";


export class cognitionPipeline {


private validator =
new PhaseValidator();


private executor =
new PhaseExecutor();



run(
input:unknown
){


const phases = [

CognitivePhase.PERCEPTION,

CognitivePhase.UNDERSTANDING,

CognitivePhase.REASONING,

CognitivePhase.ACTION,

CognitivePhase.REFLECTION,

CognitivePhase.MEMORY

];


let current = phases[0];

const trace:any[]=[];



for(
let i=0;
i<phases.length;
i++
){


const phase=phases[i];


if(
i > 0 &&
!this.validator.canTransition(
current,
phase
)
){

throw new Error(
`Invalid cognition transition ${current} -> ${phase}`
);

}


const result =
this.executor.execute(
phase,
input
);


trace.push(result);


current=phase;

}



return {

success:true,

trace

};


}


}
