
export interface DriftReport {
  component: string;
  driftScore: number; // 0 stable → 1 broken
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface HealingAction {
  target: string;
  action: string;
  effect: string;
}

export interface SystemHealth {
  overallHealth: number;
  degradedModules: string[];
  recoveryActions: HealingAction[];
}
