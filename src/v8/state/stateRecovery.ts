import {
CognitiveStateStore
}
from "./cognitiveStateStore";


export class StateRecovery {


constructor(
private store:CognitiveStateStore
){}



recover(){

return this.store.snapshot();

}


}
