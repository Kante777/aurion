

export type MemoryRelationship =
  | "CAUSED"
  | "SIMILAR"
  | "FOLLOWED"
  | "CONTRADICTED"
  | "REINFORCED";


export interface MemoryEdge {


 from:string;

 to:string;

 relationship:MemoryRelationship;

 strength:number;


}


