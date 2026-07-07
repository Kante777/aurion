import { EventBus } from "../../core/bus/eventBus";
import { ContradictionEvent, ContradictionType } from "./contradictionTypes";

export class ContradictionEngine {
  private latestState: Map<string, any> = new Map();

  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("NARRATIVE_UPDATED", (narrative: any) => {
      this.latestState.set(narrative.instrument, narrative);
      this.evaluate(narrative.instrument);
    });

    this.bus.on("REGIME_UPDATED", (regime: any) => {
      this.latestState.set(regime.instrument, regime);
      this.evaluate(regime.instrument);
    });

    this.bus.on("STRUCTURE_EVENT", (event: any) => {
      this.latestState.set(event.instrument, event);
      this.evaluate(event.instrument);
    });

    this.bus.on("LIQUIDITY_EVENT", (event: any) => {
      this.latestState.set(event.instrument, event);
      this.evaluate(event.instrument);
    });
  }

  private evaluate(instrument: string) {
    const state = this.latestState.get(instrument);

    if (!state) return;

    const contradictions = this.detectContradictions(state);

    for (const c of contradictions) {
      this.bus.emit("CONTRADICTION_EVENT", c);
    }
  }

  private detectContradictions(state: any): ContradictionEvent[] {
    const results: ContradictionEvent[] = [];

    // 1. Narrative vs Regime conflict
    if (state?.type && state?.state && state?.regime) {
      if (state.state === "EXPANSION" && state.regime === "RANGING") {
        results.push(this.create(
          state.instrument,
          "REGIME_NARRATIVE_CONFLICT",
          0.7,
          "Narrative expansion conflicts with ranging regime"
        ));
      }
    }

    // 2. Structure vs Liquidity conflict (simplified heuristic)
    if (state?.type === "BOS_BULLISH" && state?.type === "SWEEP_HIGH") {
      results.push(this.create(
        state.instrument,
        "STRUCTURE_LIQUIDITY_CONFLICT",
        0.8,
        "Bullish structure invalidated by liquidity sweep"
      ));
    }

    // 3. Timeframe divergence placeholder (Phase 8 will deepen this)
    if (Math.random() > 0.95) {
      results.push(this.create(
        state.instrument,
        "TIMEFRAME_DIVERGENCE",
        0.6,
        "Detected divergence between HTF and LTF structures"
      ));
    }

    return results;
  }

  private create(
    instrument: string,
    type: ContradictionType,
    severity: number,
    description: string
  ): ContradictionEvent {
    return {
      id: crypto.randomUUID(),
      instrument: instrument as any,
      type,
      severity,
      description,
      affectedSystems: ["NARRATIVE", "REGIME", "STRUCTURE"],
      timestamp: Date.now(),
    };
  }
}
