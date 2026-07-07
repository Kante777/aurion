import {
CognitionBus
}
from "../events";


import {
RuntimeState
}
from "./runtimeState";


import {
LifecycleManager
}
from "./lifecycleManager";


import {
CognitionPipeline
}
from "./cognitionPipeline";


import {
RuntimeController
}
from "./runtimeController";



export class AurionRuntime {


private controller:
RuntimeController;



constructor(){


const bus =
new CognitionBus();


const state =
new RuntimeState();


const lifecycle =
new LifecycleManager(
state
);


const pipeline =
new CognitionPipeline(
bus
);



this.controller =
new RuntimeController(
state,
lifecycle,
pipeline
);


}



start(){

this.controller.start();

}



cycle(
marketData:any
){

return this.controller.process(
marketData
);

}



status(){

return this.controller.status();

}


}