export interface AdaptiveBridge {
  fuse(evidence: any[]): any;
  applyOutcome(state: string, evidence: any[], result: any): any;
  getWeights(): Record<string, number>;
}
