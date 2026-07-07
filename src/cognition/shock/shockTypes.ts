
export interface ShockSignal {
  source: string;
  intensity: number;
  type: "CONTRADICTION" | "CORRELATION_BREAK" | "REGIME_SHIFT" | "LIQUIDITY_STRESS";
  timestamp: number;
}

export interface SystemStress {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  triggers: ShockSignal[];
}
