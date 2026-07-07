import {
RuntimeCheckpoint
}
from "./hardeningTypes";


export class CheckpointManager {


private checkpoints:RuntimeCheckpoint[]=[];



save(
state:unknown
){


const checkpoint={

id:
`checkpoint_${Date.now()}`,

state,

timestamp:
Date.now()

};



this.checkpoints.push(
checkpoint
);



return checkpoint;

}



latest(){

return this.checkpoints.at(-1);

}


}

