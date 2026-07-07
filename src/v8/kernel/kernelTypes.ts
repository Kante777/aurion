export enum KernelState{

STARTING =
"STARTING",

RUNNING =
"RUNNING",

PAUSED =
"PAUSED",

STOPPED =
"STOPPED"

}



export interface KernelStatus{

state:KernelState;

cycles:number;

startedAt:number;

}