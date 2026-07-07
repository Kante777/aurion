import {
GovernanceContext
}
from "./governanceTypes";


export class CognitionPolicy {



evaluate(
context:GovernanceContext
){


if(
context.uncertainty > 0.8
){

return {

approved:false,

reason:
"High uncertainty state"

};

}



if(
context.confidence < 0.2
){

return {

approved:false,

reason:
"Insufficient confidence"

};

}



return {

approved:true,

reason:
"Policy satisfied"

};


}


}
