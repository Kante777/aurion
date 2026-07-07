import {
LearningEngine
}
from "./learningEngine";


export class LearningCoordinator {



private engine =
new LearningEngine();



process(
artifact:any,
expected:any,
actual:any,
confidence:number
){


return this.engine.learn(

artifact,

expected,

actual,

confidence

);


}


}

