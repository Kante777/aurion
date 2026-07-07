import {
LearningBridge
}
from "./learningBridge";


import {
ConfidenceUpdater
}
from "./confidenceUpdater";


export class AdaptationCoordinator {


private bridge =
new LearningBridge();


private confidence =
new ConfidenceUpdater();



process(
currentConfidence:number,
learningSignal:any
){


const feedback =
this.bridge.consume(
learningSignal
);



return {


feedback,


newConfidence:

this.confidence.update(
currentConfidence,
feedback
)


};


}


}
