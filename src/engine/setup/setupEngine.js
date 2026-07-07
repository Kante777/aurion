"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupEngine = void 0;
class SetupEngine {
    bus;
    setups = new Map();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("BELIEF_UPDATED", (belief) => {
            this.evaluate(belief);
        });
    }
    evaluate(belief) {
        const instrument = belief.instrument;
        const confidence = belief.confidence;
        if (confidence < 0.55)
            return;
        const direction = this.mapDirection(belief.type);
        if (direction === "NO_SETUP")
            return;
        const setup = {
            id: crypto.randomUUID(),
            instrument,
            direction,
            entryZone: this.calculateEntryZone(belief),
            stopLoss: this.calculateStopLoss(belief),
            takeProfit: this.calculateTargets(belief),
            confidence,
            confluenceScore: this.calculateConfluence(belief),
            reasoning: this.buildReasoning(belief),
            createdAt: Date.now(),
        };
        this.setups.set(instrument, setup);
        this.bus.emit("SETUP_GENERATED", setup);
    }
    mapDirection(type) {
        switch (type) {
            case "BULLISH_CONTINUATION":
            case "REVERSAL_BULLISH":
                return "BUY";
            case "BEARISH_CONTINUATION":
            case "REVERSAL_BEARISH":
                return "SELL";
            default:
                return "NO_SETUP";
        }
    }
    calculateEntryZone(belief) {
        const base = 1.1000; // placeholder anchor (will be replaced in Phase 10 pricing engine)
        return {
            low: base - 0.0020,
            high: base + 0.0020,
        };
    }
    calculateStopLoss(belief) {
        return 1.0950; // placeholder structural SL logic will replace in Phase 10
    }
    calculateTargets(belief) {
        return [1.1050, 1.1100];
    }
    calculateConfluence(belief) {
        let score = 50;
        score += belief.confidence * 30;
        if (belief.supportingEvidence?.length > 10)
            score += 10;
        if (belief.contradictingEvidence?.length > 5)
            score -= 15;
        return Math.max(0, Math.min(100, score));
    }
    buildReasoning(belief) {
        return [
            `Belief Type: ${belief.type}`,
            `Confidence: ${belief.confidence}`,
            `Supporting Evidence Count: ${belief.supportingEvidence?.length || 0}`,
            `Contradictions Count: ${belief.contradictingEvidence?.length || 0}`,
        ];
    }
    getSetup(instrument) {
        return this.setups.get(instrument);
    }
}
exports.SetupEngine = SetupEngine;
