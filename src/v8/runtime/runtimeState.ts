import {
 RuntimeStatus,
 RuntimeSnapshot
}
from "./runtimeTypes";


export class RuntimeState {


private snapshot:RuntimeSnapshot = {

status:
RuntimeStatus.CREATED,

cycles:0,

startedAt:
Date.now()

};



setStatus(
status:RuntimeStatus
){

this.snapshot.status=status;

}



incrementCycle(){

this.snapshot.cycles++;

this.snapshot.lastCycle =
Date.now();

}



getSnapshot():
RuntimeSnapshot {

return {
...this.snapshot
};

}


}