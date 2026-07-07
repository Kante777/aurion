"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionEngine = void 0;
class ExecutionEngine {
    bus;
    executions = new Map();
    constructor(bus) {
        this.bus = bus;
        this.register();
    }
    register() {
        this.bus.on("SETUP_GENERATED", (setup) => {
            this.process(setup);
        });
    }
    process(setup) {
        if (setup.confidence < 0.6)
            return;
        const entry = this.refineEntry(setup);
        const stop = this.refineStop(setup, entry);
        const targets = this.refineTargets(setup, entry);
        const riskPercent = this.calculateRisk(setup.confidence, setup.confluenceScore);
        const positionSize = this.calculatePositionSize(riskPercent, entry, stop);
        const rr = this.calculateRR(entry, stop, targets);
        const executionScore = this.calculateExecutionScore(setup.confidence, setup.confluenceScore, rr, riskPercent);
        const execution = {
            id: crypto.randomUUID(),
            instrument: setup.instrument,
            direction: setup.direction,
            entry,
            stopLoss: stop,
            takeProfit: targets,
            riskPercent,
            positionSize,
            rrRatio: rr,
            confidence: setup.confidence,
            executionScore,
            reasoning: this.buildReasoning(setup, rr, riskPercent),
            timestamp: Date.now(),
        };
        this.executions.set(setup.instrument, execution);
        this.bus.emit("EXECUTION_CANDIDATE_CREATED", execution);
    }
    // =========================
    // PRICE INTELLIGENCE LAYER
    // =========================
    refineEntry(setup) {
        const mid = (setup.entryZone.low + setup.entryZone.high) / 2;
        // micro-adjustment logic (Phase 11 will replace with liquidity engine precision)
        return mid;
    }
    refineStop(setup, entry) {
        const buffer = 0.0015;
        if (setup.direction === "BUY") {
            return entry - buffer;
        }
        return entry + buffer;
    }
    refineTargets(setup, entry) {
        const rr1 = 2;
        const rr2 = 3;
        if (setup.direction === "BUY") {
            return [
                entry + 0.0020 * rr1,
                entry + 0.0020 * rr2,
            ];
        }
        return [
            entry - 0.0020 * rr1,
            entry - 0.0020 * rr2,
        ];
    }
    // =========================
    // RISK MODEL
    // =========================
    calculateRisk(confidence, confluence) {
        const base = 2.0; // 2% max baseline risk
        const adjustment = (confidence + confluence / 100) / 2;
        return Math.max(0.25, base * adjustment);
    }
    calculatePositionSize(riskPercent, entry, stop) {
        const riskAmount = riskPercent / 100;
        const distance = Math.abs(entry - stop);
        if (distance === 0)
            return 0;
        return riskAmount / distance;
    }
    calculateRR(entry, stop, targets) {
        const risk = Math.abs(entry - stop);
        const reward = Math.abs(targets[0] - entry);
        if (risk === 0)
            return 0;
        return reward / risk;
    }
    calculateExecutionScore(confidence, confluence, rr, risk) {
        return (confidence * 40 +
            (confluence / 100) * 30 +
            Math.min(rr / 3, 1) * 20 +
            (1 - risk / 2) * 10);
    }
    buildReasoning(setup, rr, risk) {
        return [
            `Setup Confidence: ${setup.confidence}`,
            `Confluence Score: ${setup.confluenceScore}`,
            `Risk Adjusted: ${risk.toFixed(2)}%`,
            `Risk-Reward Ratio: ${rr.toFixed(2)}`,
        ];
    }
    getExecution(instrument) {
        return this.executions.get(instrument);
    }
}
exports.ExecutionEngine = ExecutionEngine;
