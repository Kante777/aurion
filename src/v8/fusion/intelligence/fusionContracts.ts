export interface FusionEvidence {

phase:string;

source:string;

confidence:number;

strength?:number;

score?:number;

payload?:unknown;

timestamp?:number;

[key:string]:unknown;

}



export interface FusionResult {

score:number;

confidence:number;

evidence:number;

decisionReady:boolean;

[key:string]:unknown;

}

