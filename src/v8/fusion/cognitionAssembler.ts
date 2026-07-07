import {
FusionContext
}
from "./fusionContext";


export class CognitionAssembler {


assemble(
context:FusionContext
){

return {

cycleId:
context.cycleId,

input:
context.input,

confidence:
context.confidence,

state:
context.state

};

}


}
