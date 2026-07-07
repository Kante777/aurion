
export interface MarketNode {
  id: string;
  type: "MACRO" | "ASSET" | "SECTOR" | "SENTIMENT";
  name: string;
}

export interface MarketEdge {
  from: string;
  to: string;
  strength: number;
  lag: number;
  regime: "RISK_ON" | "RISK_OFF" | "MIXED";
}

export interface WorldState {
  nodes: MarketNode[];
  edges: MarketEdge[];
  timestamp: number;
}
