import { EventBus } from "../../core/bus/eventBus";
import { Belief, BeliefType } from "./beliefTypes";

export class BeliefEngine {
  private beliefs: Map<string, Belief> = new Map();

  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("NARRATIVE_UPDATED", (narrative: any) => {
      this.updateFromNarrative(narrative);
    });

    this.bus.on("REGIME_UPDATED", (regime: any) => {
      this.updateFromRegime(regime);
    });

    this.bus.on("STRUCTURE_EVENT", (event: any) => {
      this.updateFromStructure(event);
    });

    this.bus.on("LIQUIDITY_EVENT", (event: any) => {
      this.updateFromLiquidity(event);
    });

    this.bus.on("CONTRADICTION_EVENT", (event: any) => {
      this.updateFromContradiction(event);
    });
  }

  private getOrCreate(instrument: string): Belief {
    let belief = this.beliefs.get(instrument);

    if (!belief) {
      belief = {
        id: crypto.randomUUID(),
        instrument: instrument as any,
        type: "UNKNOWN",
        confidence: 0.5,
        supportingEvidence: [],
        contradictingEvidence: [],
        decay: 0.01,
        lastUpdated: Date.now(),
      };

      this.beliefs.set(instrument, belief);
    }

    return belief;
  }

  // =========================
  // UPDATES FROM SYSTEMS
  // =========================

  private updateFromNarrative(narrative: any) {
    const belief = this.getOrCreate(narrative.instrument);

    belief.supportingEvidence.push(`NARRATIVE:${narrative.type}`);

    belief.type = this.mapNarrativeToBelief(narrative.type);

    belief.confidence += narrative.confidence * 0.1;

    this.normalize(belief);
  }

  private updateFromRegime(regime: any) {
    const belief = this.getOrCreate(regime.instrument);

    belief.supportingEvidence.push(`REGIME:${regime.type}`);

    belief.confidence += regime.strength * 0.05;

    this.normalize(belief);
  }

  private updateFromStructure(event: any) {
    const belief = this.getOrCreate(event.instrument);

    belief.supportingEvidence.push(`STRUCTURE:${event.type}`);

    belief.confidence += 0.03;

    this.normalize(belief);
  }

  private updateFromLiquidity(event: any) {
    const belief = this.getOrCreate(event.instrument);

    belief.supportingEvidence.push(`LIQUIDITY:${event.type}`);

    belief.confidence += 0.04;

    this.normalize(belief);
  }

  private updateFromContradiction(event: any) {
    const belief = this.getOrCreate(event.instrument);

    belief.contradictingEvidence.push(`CONTRADICTION:${event.type}`);

    belief.confidence -= event.severity * 0.15;

    this.normalize(belief);
  }

  // =========================
  // CORE LOGIC
  // =========================

  private mapNarrativeToBelief(type: string): BeliefType {
    switch (type) {
      case "BULLISH_CONTINUATION":
        return "BULLISH_CONTINUATION";
      case "BEARISH_CONTINUATION":
        return "BEARISH_CONTINUATION";
      case "REVERSAL_BULLISH":
        return "REVERSAL_BULLISH";
      case "REVERSAL_BEARISH":
        return "REVERSAL_BEARISH";
      default:
        return "UNKNOWN";
    }
  }

  private normalize(belief: Belief) {
    // clamp confidence
    belief.confidence = Math.max(0, Math.min(1, belief.confidence));

    belief.lastUpdated = Date.now();

    this.beliefs.set(belief.instrument, belief);

    this.bus.emit("BELIEF_UPDATED", belief);
  }

  getBelief(instrument: string) {
    return this.beliefs.get(instrument);
  }
}
