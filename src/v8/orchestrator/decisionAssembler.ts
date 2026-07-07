import {
CognitiveDecision
}
from "./orchestratorTypes";


export class DecisionAssembler {



assemble(
context:any
):CognitiveDecision{


return {


approved:true,


confidence:

context.confidence ?? 0,


reason:

"context assembled",


state:

context,


timestamp:

Date.now()


};


}


}
