"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalFusionEngine = void 0;
class TemporalFusionEngine {
    correlation;
    temporal;
    learning;
    constructor(correlation, temporal, learning) {
        this.correlation = correlation;
        this.temporal = temporal;
        this.learning = learning;
    }
    /**
     * Build unified causal intelligence view
     */
    analyze(instruments) {
        const report = [];
        let globalBias = 0;
        const flowOrder = this.temporal.buildFlowOrder(instruments);
        for (const instrument of instruments) {
            // =========================
            // 1. CORRELATION CONTEXT
            // =========================
            const events = this.correlation.marketStates?.get(instrument) || [];
            const rawSentiment = this.calculateRaw(events);
            const correlationAdjusted = this.applyCorrelation(instrument, rawSentiment);
            // =========================
            // 2. TEMPORAL CONTEXT
            // =========================
            const temporalWeight = this.temporal.temporalWeight(instrument);
            // =========================
            // 3. LEARNING CONTEXT
            // =========================
            const learned = this.learning.getProfile(instrument);
            const leadScore = learned?.leadScore ?? 0.5;
            // =========================
            // 4. FINAL CAUSAL SCORE
            // =========================
            const finalScore = correlationAdjusted *
                temporalWeight *
                leadScore;
            report.push({
                instrument,
                rawSentiment,
                correlationAdjusted,
                temporalWeight,
                leadScore,
                finalScore
            });
            globalBias += finalScore;
        }
        const regime = globalBias > 2
            ? "RISK_ON"
            : globalBias < -2
                ? "RISK_OFF"
                : "MIXED";
        return {
            regime,
            flowOrder,
            report
        };
    }
    /**
     * reuse same logic pattern as correlation engine
     */
    calculateRaw(events) {
        let sentiment = 0;
        for (const e of events) {
            if (e.type === "NEWS") {
                sentiment += e.data.impact === "HIGH" ? -2 : -1;
            }
            if (e.type === "BELIEF") {
                sentiment += e.data.direction === "BUY" ? 1 : -1;
            }
        }
        return sentiment;
    }
    applyCorrelation(instrument, raw) {
        // lightweight placeholder (correlation engine should be injected later properly)
        return raw * 1.1;
    }
}
exports.TemporalFusionEngine = TemporalFusionEngine;
