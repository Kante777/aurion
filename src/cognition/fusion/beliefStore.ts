import { BeliefState } from "./fusionTypes";

export class BeliefStore {
  private beliefs: Map<string, BeliefState> = new Map();

  set(belief: BeliefState) {
    this.beliefs.set(belief.instrument, belief);
  }

  get(instrument: string) {
    return this.beliefs.get(instrument);
  }

  getAll() {
    return Array.from(this.beliefs.values());
  }

  clear() {
    this.beliefs.clear();
  }
}
