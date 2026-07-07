export interface ExecutionContext {

  executionId:string;

  input:unknown;

  startedAt:number;

  metadata?:Record<string,unknown>;

}
