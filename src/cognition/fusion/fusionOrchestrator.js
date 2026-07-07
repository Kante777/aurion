"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionOrchestrator = void 0;
class FusionOrchestrator {
    engine;
    inputs;
    constructor(engine, inputs) {
        this.engine = engine;
        this.inputs = inputs;
    }
    run() {
        const decision = this.engine.fuse(this.inputs);
        return {
            timestamp: Date.now(),
            decision,
            summary: `Market=${decision.marketState}, Risk=${decision.riskLevel.toFixed(2)}, Signal=${decision.dominantSignal}`
        };
    }
}
exports.FusionOrchestrator = FusionOrchestrator;
