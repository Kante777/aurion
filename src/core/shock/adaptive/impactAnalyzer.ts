export class ImpactAnalyzer {

  computeBaseline(fusion: any) {
    return fusion.shockScore;
  }

  // simulate removal of one detector
  computeWithout(detectorName: string, evidence: any[]) {

    const filtered = evidence.filter(e => e.detector !== detectorName);

    if (filtered.length === 0) return 0;

    // simplified re-fusion approximation
    const sum = filtered.reduce((acc, e) => acc + (e.score * e.confidence), 0);
    const total = filtered.reduce((acc, e) => acc + e.confidence, 0);

    return total === 0 ? 0 : sum / total;
  }

  computeImpact(detectorName: string, fusion: any, evidence: any[]) {

    const baseline = this.computeBaseline(fusion);
    const without = this.computeWithout(detectorName, evidence);

    return Math.abs(baseline - without);
  }
}
