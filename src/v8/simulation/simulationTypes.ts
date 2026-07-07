export interface Scenario {

id:string;

description:string;

probability:number;

risk:number;

state:unknown;

}


export interface SimulationResult {

scenarios:Scenario[];

bestScenario?:Scenario;

confidence:number;

timestamp:number;

}

