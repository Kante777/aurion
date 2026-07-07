export enum FusionStatus {

  INITIALIZED = "INITIALIZED",

  RUNNING = "RUNNING",

  COMPLETED = "COMPLETED",

  FAILED = "FAILED"

}


export interface FusionTrace {

  stage:string;

  timestamp:number;

  status:FusionStatus;

}


export interface FusionOutput {

  success:boolean;

  confidence:number;

  trace:FusionTrace[];

  result?:unknown;

}
