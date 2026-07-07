
export type WorldStateStatus =
  | "STABLE"
  | "TRANSITION"
  | "UNCERTAIN"
  | "DISRUPTED";


export interface WorldState {

  id:string;

  timestamp:number;

  status:WorldStateStatus;

  confidence:number;

  variables:Record<string, unknown>;

}


