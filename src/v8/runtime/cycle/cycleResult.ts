export interface CognitiveCycleResult {

  cycleId:string;

  success:boolean;

  output:unknown;

  phasesCompleted:string[];

  startedAt:number;

  completedAt:number;

  duration:number;

}
