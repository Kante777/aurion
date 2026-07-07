import {
PolicyEvaluator
}
from "./policyEvaluator";


import {
RiskBoundary
}
from "./riskBoundary";


import {
AuthorityManager
}
from "./authorityManager";



export class GovernanceEngine {



private policy =
new PolicyEvaluator();



private risk =
new RiskBoundary();



private authority =
new AuthorityManager();




evaluate(
context:any
){


const policy =
this.policy.evaluate(
context
);



const riskScore =
this.risk.calculate(
context
);



const allowedRisk =
this.risk.withinLimit(
riskScore
);



const authorized =
this.authority.hasAuthority(
context.source
);



return {


approved:

policy.approved &&
allowedRisk &&
authorized,


reason:

policy.reason,


risk:

riskScore,


timestamp:

Date.now()


};


}


}
