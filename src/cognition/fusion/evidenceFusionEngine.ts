import { Evidence } from "../evidence/evidenceTypes";
import { BeliefState } from "./fusionTypes";

export class EvidenceFusionEngine {

  private getDirection(value: number): "BUY" | "SELL" | "NEUTRAL" {
    if (value > 0.15) return "BUY";
    if (value < -0.15) return "SELL";
    return "NEUTRAL";
  }

  fuse(instrument: string, evidenceList: Evidence[]): BeliefState {

    let score = 0;
    let confidence = 0;

    const supporting: Evidence[] = [];
    const contradicting: Evidence[] = [];

    for (const e of evidenceList) {

      const weighted = e.value * e.confidence;

      score += weighted;
      confidence += e.confidence;

      if (e.value > 0) supporting.push(e);
      if (e.value < 0) contradicting.push(e);
    }

    const avgConfidence = evidenceList.length
      ? confidence / evidenceList.length
      : 0;

    const direction = this.getDirection(score);

    return {
      instrument,
      direction,
      confidence: avgConfidence,
      strength: score,
      supportingEvidence: supporting,
      contradictingEvidence: contradicting
    };
  }
}
