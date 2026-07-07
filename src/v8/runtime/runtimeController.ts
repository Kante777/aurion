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


export class RuntimeController {


constructor(

private state:
RuntimeState,

private lifecycle:
LifecycleManager,

private pipeline:
CognitionPipeline

){}



start(){

this.lifecycle.initialize();

this.lifecycle.activate();

}



process(
marketData:any
){

this.state.incrementCycle();


return this.pipeline.execute(
marketData
);


}



status(){

return this.state.getSnapshot();

}


}