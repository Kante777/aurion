import {
StateSyncRequest,
StateSyncResult
}
from "./stateSyncTypes";


import {
StateCheckpointStore
}
from "./stateCheckpoint";



export class StateSynchronizer {


private checkpoint =
new StateCheckpointStore();



synchronize(
request:StateSyncRequest
):StateSyncResult{


const previous =
this.checkpoint.latest()?.state ?? null;



this.checkpoint.save(
request.state
);



return {

success:true,

previous,

current:
request.state

};


}


}
