import {
CognitionCoordinator
}
from "./cognitionCoordinator";


import {
DecisionAssembler
}
from "./decisionAssembler";



export class AutonomousOrchestrator {



private coordinator =
new CognitionCoordinator();



private assembler =
new DecisionAssembler();




execute(
request:any
){


const cognition =

this.coordinator.process(
request
);



return this.assembler.assemble(
cognition
);


}


}
