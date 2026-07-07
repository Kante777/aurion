"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiedLoop = void 0;
class UnifiedLoop {
    fusion;
    stability;
    healing;
    sovereignty;
    execution;
    constructor(fusion, stability, healing, sovereignty, execution) {
        this.fusion = fusion;
        this.stability = stability;
        this.healing = healing;
        this.sovereignty = sovereignty;
        this.execution = execution;
    }
    run(snapshot) {
        const decision = this.fusion.fuse(snapshot);
        const stabilityReport = this.stability.checkConsistency(snapshot);
        const stabilityAction = this.stability.resolve(stabilityReport);
        const health = this.healing.runHealingCycle(snapshot);
        const sovereign = this.sovereignty.lockDecision(decision.dominantSignal);
        const execution = this.execution.execute({
            instrument: "EURUSD",
            direction: decision.dominantSignal.includes("BUY")
                ? "BUY"
                : "SELL",
            confidence: decision.confidence,
            riskLevel: decision.riskLevel,
            reason: decision.marketState
        });
        return {
            timestamp: Date.now(),
            decision,
            execution,
            health,
            stability: {
                report: stabilityReport,
                action: stabilityAction
            },
            sovereign
        };
    }
}
exports.UnifiedLoop = UnifiedLoop;
