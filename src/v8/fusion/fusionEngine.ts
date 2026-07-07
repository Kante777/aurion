import {
FusionContext
}
from "./fusionContext";


import {
FusionOutput,
FusionStatus
}
from "./fusionTypes";


import {
FusionValidator
}
from "./fusionValidator";


import {
PhaseCoordinator
}
from "./phaseCoordinator";


export class FusionEngine {


private validator =
new FusionValidator();


private coordinator =
new PhaseCoordinator();



execute(
context:FusionContext
):FusionOutput {


if(
!this.validator.validate(context)
){

return {

success:false,

confidence:0,

trace:[

{

stage:"validation",

timestamp:Date.now(),

status:FusionStatus.FAILED

}

]

};

}



const trace =
this.coordinator
.sequence()
.map(
phase=>({

stage:phase,

timestamp:Date.now(),

status:FusionStatus.RUNNING

})

);



return {

success:true,

confidence:
context.confidence,

trace,

result:context

};


}


}
