import {
AdaptiveFeedbackGenerator
}
from "./adaptiveFeedback";


export class LearningBridge {


private generator =
new AdaptiveFeedbackGenerator();



consume(
learningSignal:any
){


return this.generator.generate(
learningSignal
);


}


}
