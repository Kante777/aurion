import {
ReasoningController
}
from "./reasoningController";


export class CognitionCoordinator {


private reasoning =
new ReasoningController();



process(
request:any
){


const reasoning =

this.reasoning.evaluate(
request.input
);



return {


reasoning,


source:
request.source,


confidence:
request.confidence


};


}


}
