export interface GovernanceDecision {

approved:boolean;

reason:string;

risk:number;

timestamp:number;

}


export interface GovernanceContext {

confidence:number;

uncertainty:number;

source:string;

payload:unknown;

}

