export interface LearningSignal {

accuracy:number;

confidence:number;

improvement:number;

timestamp:number;

}



export interface LearningExperience {

pattern:string;

result:string;

signal:LearningSignal;

payload:unknown;

}

