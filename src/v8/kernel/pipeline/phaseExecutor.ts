import {
CognitivePhase
}
from "./pipelineTypes";


export interface PhaseResult {

phase:CognitivePhase;

success:boolean;

output?:unknown;

}



export class PhaseExecutor {


execute(
phase:CognitivePhase,
input:unknown
):PhaseResult {


return {

phase,

success:true,

output:input

};


}


}
