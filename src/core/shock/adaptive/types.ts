export interface FusionResult {
  shockScore: number;
  state: "STABLE" | "ACTIVE" | "VOLATILE";
  contributions: {
    detector: string;
    score: number;
    confidence: number;
    weight?: number;
  }[];
}
