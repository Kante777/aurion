"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContradictionEngine = void 0;
class ContradictionEngine {
    bus;
    latestState = new Map();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("NARRATIVE_UPDATED", (narrative) => {
            this.latestState.set(narrative.instrument, narrative);
            this.evaluate(narrative.instrument);
        });
        this.bus.on("REGIME_UPDATED", (regime) => {
            this.latestState.set(regime.instrument, regime);
            this.evaluate(regime.instrument);
        });
        this.bus.on("STRUCTURE_EVENT", (event) => {
            this.latestState.set(event.instrument, event);
            this.evaluate(event.instrument);
        });
        this.bus.on("LIQUIDITY_EVENT", (event) => {
            this.latestState.set(event.instrument, event);
            this.evaluate(event.instrument);
        });
    }
    evaluate(instrument) {
        const state = this.latestState.get(instrument);
        if (!state)
            return;
        const contradictions = this.detectContradictions(state);
        for (const c of contradictions) {
            this.bus.emit("CONTRADICTION_EVENT", c);
        }
    }
    detectContradictions(state) {
        const results = [];
        // 1. Narrative vs Regime conflict
        if (state?.type && state?.state && state?.regime) {
            if (state.state === "EXPANSION" && state.regime === "RANGING") {
                results.push(this.create(state.instrument, "REGIME_NARRATIVE_CONFLICT", 0.7, "Narrative expansion conflicts with ranging regime"));
            }
        }
        // 2. Structure vs Liquidity conflict (simplified heuristic)
        if (state?.type === "BOS_BULLISH" && state?.type === "SWEEP_HIGH") {
            results.push(this.create(state.instrument, "STRUCTURE_LIQUIDITY_CONFLICT", 0.8, "Bullish structure invalidated by liquidity sweep"));
        }
        // 3. Timeframe divergence placeholder (Phase 8 will deepen this)
        if (Math.random() > 0.95) {
            results.push(this.create(state.instrument, "TIMEFRAME_DIVERGENCE", 0.6, "Detected divergence between HTF and LTF structures"));
        }
        return results;
    }
    create(instrument, type, severity, description) {
        return {
            id: crypto.randomUUID(),
            instrument: instrument,
            type,
            severity,
            description,
            affectedSystems: ["NARRATIVE", "REGIME", "STRUCTURE"],
            timestamp: Date.now(),
        };
    }
}
exports.ContradictionEngine = ContradictionEngine;
