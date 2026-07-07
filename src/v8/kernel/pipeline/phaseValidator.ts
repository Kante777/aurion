import {
CognitivePhase,
PipelineTransition
}
from "./pipelineTypes";


export class PhaseValidator {


private transitions:PipelineTransition[] = [

{
from:CognitivePhase.PERCEPTION,
to:CognitivePhase.UNDERSTANDING
},

{
from:CognitivePhase.UNDERSTANDING,
to:CognitivePhase.REASONING
},

{
from:CognitivePhase.REASONING,
to:CognitivePhase.ACTION
},

{
from:CognitivePhase.ACTION,
to:CognitivePhase.REFLECTION
},

{
from:CognitivePhase.REFLECTION,
to:CognitivePhase.MEMORY
}

];



canTransition(
from:CognitivePhase,
to:CognitivePhase
):boolean {


return this.transitions.some(
transition =>
transition.from === from &&
transition.to === to
);


}


}
