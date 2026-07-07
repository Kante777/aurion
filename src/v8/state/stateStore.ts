import {
CognitiveState
}
from "./cognitiveState";


export class StateStore {


private current?:CognitiveState;


private history:CognitiveState[]=[];



update(
state:CognitiveState
){

this.current={
...state
};

this.history.push(
this.current
);

}



currentState(){

return this.current;

}



historyState(){

return [
...this.history
];

}


}
