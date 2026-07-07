
export type MemoryNodeType =
  | "MARKET_STATE"
  | "EXPERIENCE"
  | "OUTCOME"
  | "LESSON"
  | "PATTERN";


export interface MemoryNode {

  id:string;

  type:MemoryNodeType;

  timestamp:number;

  data:any;

}

