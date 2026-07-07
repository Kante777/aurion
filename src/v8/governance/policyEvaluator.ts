import {
CognitionPolicy
}
from "./cognitionPolicy";


export class PolicyEvaluator {


private policy =
new CognitionPolicy();



evaluate(
context:any
){


return this.policy.evaluate(
context
);


}


}
