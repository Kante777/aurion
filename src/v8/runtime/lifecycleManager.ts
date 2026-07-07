import {
RuntimeState
}
from "./runtimeState";


import {
RuntimeStatus
}
from "./runtimeTypes";


export class LifecycleManager {


constructor(
private state:RuntimeState
){}



initialize(){

this.state.setStatus(
RuntimeStatus.INITIALIZING
);

}



activate(){

this.state.setStatus(
RuntimeStatus.RUNNING
);

}



pause(){

this.state.setStatus(
RuntimeStatus.PAUSED
);

}



shutdown(){

this.state.setStatus(
RuntimeStatus.STOPPED
);

}


}
