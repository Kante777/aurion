"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioOrchestrator = void 0;
class PortfolioOrchestrator {
    decision;
    allocator;
    riskEngine;
    constructor(decision, allocator, riskEngine) {
        this.decision = decision;
        this.allocator = allocator;
        this.riskEngine = riskEngine;
    }
    run() {
        const ranked = this.decision.run().top;
        const positions = this.allocator.allocate(ranked);
        const risk = this.riskEngine.computeRisk(positions);
        return {
            positions,
            totalRisk: risk,
            timestamp: Date.now()
        };
    }
}
exports.PortfolioOrchestrator = PortfolioOrchestrator;
