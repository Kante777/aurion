"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionOrchestrator = void 0;
class DecisionOrchestrator {
    beliefs;
    engine;
    ranker;
    constructor(beliefs, engine, ranker) {
        this.beliefs = beliefs;
        this.engine = engine;
        this.ranker = ranker;
    }
    run() {
        const all = this.beliefs.getAll();
        const opportunities = all.map(b => this.engine.generate(b));
        const ranked = this.ranker.rank(opportunities);
        return {
            top: ranked.slice(0, 5),
            timestamp: Date.now()
        };
    }
}
exports.DecisionOrchestrator = DecisionOrchestrator;
