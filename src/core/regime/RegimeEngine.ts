import { RegimeScorer } from "./RegimeScorer";
import { RegimeState } from "./RegimeTypes";

export class RegimeEngine {
  private scorer = new RegimeScorer();
  private last: RegimeState | null = null;

  analyze(evidence: any[]): RegimeState {
    const state = this.scorer.score(evidence);
    this.last = state;
    return state;
  }

  getLast(): RegimeState | null {
    return this.last;
  }
}
