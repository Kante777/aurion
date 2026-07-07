export interface CompressedPattern {
  id: string;
  label: string;
  pattern: string;
  frequency: number;

  successRate: number;
  confidence: number;
  avgReward: number;

  description: string;
  data: any;
}
