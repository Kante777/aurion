"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeliefEngine = void 0;
class BeliefEngine {
    bus;
    beliefs = new Map();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("NARRATIVE_UPDATED", (narrative) => {
            this.updateFromNarrative(narrative);
        });
        this.bus.on("REGIME_UPDATED", (regime) => {
            this.updateFromRegime(regime);
        });
        this.bus.on("STRUCTURE_EVENT", (event) => {
            this.updateFromStructure(event);
        });
        this.bus.on("LIQUIDITY_EVENT", (event) => {
            this.updateFromLiquidity(event);
        });
        this.bus.on("CONTRADICTION_EVENT", (event) => {
            this.updateFromContradiction(event);
        });
    }
    getOrCreate(instrument) {
        let belief = this.beliefs.get(instrument);
        if (!belief) {
            belief = {
                id: crypto.randomUUID(),
                instrument: instrument,
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
    updateFromNarrative(narrative) {
        const belief = this.getOrCreate(narrative.instrument);
        belief.supportingEvidence.push(`NARRATIVE:${narrative.type}`);
        belief.type = this.mapNarrativeToBelief(narrative.type);
        belief.confidence += narrative.confidence * 0.1;
        this.normalize(belief);
    }
    updateFromRegime(regime) {
        const belief = this.getOrCreate(regime.instrument);
        belief.supportingEvidence.push(`REGIME:${regime.type}`);
        belief.confidence += regime.strength * 0.05;
        this.normalize(belief);
    }
    updateFromStructure(event) {
        const belief = this.getOrCreate(event.instrument);
        belief.supportingEvidence.push(`STRUCTURE:${event.type}`);
        belief.confidence += 0.03;
        this.normalize(belief);
    }
    updateFromLiquidity(event) {
        const belief = this.getOrCreate(event.instrument);
        belief.supportingEvidence.push(`LIQUIDITY:${event.type}`);
        belief.confidence += 0.04;
        this.normalize(belief);
    }
    updateFromContradiction(event) {
        const belief = this.getOrCreate(event.instrument);
        belief.contradictingEvidence.push(`CONTRADICTION:${event.type}`);
        belief.confidence -= event.severity * 0.15;
        this.normalize(belief);
    }
    // =========================
    // CORE LOGIC
    // =========================
    mapNarrativeToBelief(type) {
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
    normalize(belief) {
        // clamp confidence
        belief.confidence = Math.max(0, Math.min(1, belief.confidence));
        belief.lastUpdated = Date.now();
        this.beliefs.set(belief.instrument, belief);
        this.bus.emit("BELIEF_UPDATED", belief);
    }
    getBelief(instrument) {
        return this.beliefs.get(instrument);
    }
}
exports.BeliefEngine = BeliefEngine;
