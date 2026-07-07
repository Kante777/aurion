import {
CognitivePhase
}
from "../contracts/cognition";


export class PhaseCoordinator {


private phases:CognitivePhase[] = [

"PERCEPTION",

"UNDERSTANDING",

"REASONING",

"ACTION"

];


sequence(){

return [
...this.phases
];

}


}
