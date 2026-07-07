export type NodeType =
  | "NEWS"
  | "BELIEF"
  | "AGENT_DECISION"
  | "FINAL_DECISION"
  | "OUTCOME";

export interface GraphNode {
  id: string;
  type: NodeType;
  timestamp: number;
  data: any;
}

export type EdgeRelation =
  | "INFLUENCES"
  | "REINFORCES"
  | "CONTRADICTS";

export interface GraphEdge {
  from: string;
  to: string;
  relation: EdgeRelation;
  strength: number; // 🧠 NEW: weight of influence
}
