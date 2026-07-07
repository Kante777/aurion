export interface CognitiveDecision {

approved:boolean;

confidence:number;

reason:string;

state:unknown;

timestamp:number;

}


export interface CognitionRequest {

input:unknown;

confidence:number;

source:string;

}

