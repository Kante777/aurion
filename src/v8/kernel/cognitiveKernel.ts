import {
StateManager
}
from "./stateManager";


import {
CognitionCycle
}
from "./cognitionCycle";


import {
KernelState,
KernelStatus
}
from "./kernelTypes";



export class CognitiveKernel{


private state:
KernelState =
KernelState.STOPPED;



private cycles =
new CognitionCycle();



private manager =
new StateManager();



start(){

this.state =
KernelState.RUNNING;


}



tick(){

if(
this.state !== KernelState.RUNNING
){

return null;

}



const cycle =
this.cycles.execute();



this.manager.update(
"lastCycle",
cycle
);



return cycle;

}



status():
KernelStatus{


return {

state:
this.state,

cycles:
this.manager.snapshot()
.lastCycle
?.cycle
||0,


startedAt:
Date.now()

};


}


}