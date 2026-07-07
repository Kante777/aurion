import {
CheckpointManager
}
from "./checkpointManager";


import {
RuntimeRecovery
}
from "./runtimeRecovery";


import {
CognitiveHealth
}
from "./cognitiveHealth";


export class HardeningEngine {



private checkpoint =
new CheckpointManager();



private recovery =
new RuntimeRecovery();



private health =
new CognitiveHealth();




inspect(
state:any
){



const snapshot =
this.checkpoint.save(
state
);



return {


snapshot,


health:

this.health.evaluate(),


recoveryReady:true


};


}



}

