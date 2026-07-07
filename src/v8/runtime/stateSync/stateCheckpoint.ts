import {
CognitiveState
}
from "../../state";


export interface StateCheckpoint {

id:string;

state:CognitiveState;

createdAt:number;

}


export class StateCheckpointStore {


private checkpoints:StateCheckpoint[]=[];


save(
state:CognitiveState
){

const checkpoint={

id:
`checkpoint-${Date.now()}`,

state,

createdAt:
Date.now()

};


this.checkpoints.push(checkpoint);


return checkpoint;

}


latest(){

return this.checkpoints[
this.checkpoints.length-1
];

}


}
