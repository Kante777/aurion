export interface ExecutionResult {

  executionId:string;

  success:boolean;

  output:unknown;

  duration:number;

  completedAt:number;

}
