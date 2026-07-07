export interface Evidence {

  source: string;

  category:
    | "STRUCTURE"
    | "LIQUIDITY"
    | "REGIME"
    | "VOLATILITY"
    | "EXTERNAL";

  confidence: number;

  value: unknown;
}
