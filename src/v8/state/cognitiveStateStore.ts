import {
CognitiveStateSnapshot
}
from "./stateTypes";


export class CognitiveStateStore {


private state?:CognitiveStateSnapshot;



update(
state:CognitiveStateSnapshot
){

this.state={
...state
};

}



snapshot():
CognitiveStateSnapshot | undefined {

return this.state;

}


}
