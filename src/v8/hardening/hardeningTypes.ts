export interface RuntimeCheckpoint {

id:string;

state:unknown;

timestamp:number;

}


export interface HealthReport {

healthy:boolean;

issues:string[];

timestamp:number;

}


export interface RuntimeFault {

component:string;

severity:"low"|"medium"|"high";

message:string;

timestamp:number;

}

