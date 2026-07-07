"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelationEngine = void 0;
class CorrelationEngine {
    marketStates = new Map();
    roles = new Map([
        ["EURUSD", "USD_BAROMETER"],
        ["GBPUSD", "USD_AMPLIFIER"],
        ["XAUUSD", "RISK_HEDGE"],
        ["NAS100", "RISK_SENTIMENT"],
        ["BTCUSD", "LIQUIDITY_OUTLIER"]
    ]);
    correlationMatrix = new Map([
        ["EURUSD|GBPUSD", 0.92],
        ["EURUSD|XAUUSD", -0.65],
        ["GBPUSD|XAUUSD", -0.55]
    ]);
    addEvent(instrument, event) {
        if (!this.marketStates.has(instrument)) {
            this.marketStates.set(instrument, []);
        }
        this.marketStates.get(instrument).push(event);
    }
    getRole(instrument) {
        return this.roles.get(instrument) || "UNKNOWN";
    }
    getCorrelation(a, b) {
        return this.correlationMatrix.get(`${a}|${b}`) ||
            this.correlationMatrix.get(`${b}|${a}`) ||
            0;
    }
    calculateRawSentiment(events) {
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
    applyCorrelationAdjustment(instrument, raw) {
        const instruments = Array.from(this.marketStates.keys());
        let adjustment = 0;
        for (const other of instruments) {
            if (other === instrument)
                continue;
            const corr = this.getCorrelation(instrument, other);
            const otherEvents = this.marketStates.get(other);
            const otherSentiment = this.calculateRawSentiment(otherEvents);
            adjustment += corr * otherSentiment * 0.5;
        }
        return raw + adjustment;
    }
    analyzeGlobalNarrative() {
        const instruments = Array.from(this.marketStates.keys());
        const report = [];
        let macroBias = 0;
        for (const instrument of instruments) {
            const events = this.marketStates.get(instrument);
            const role = this.getRole(instrument);
            const raw = this.calculateRawSentiment(events);
            const adjusted = this.applyCorrelationAdjustment(instrument, raw);
            report.push({
                instrument,
                role,
                rawSentiment: raw,
                adjustedSentiment: adjusted
            });
            macroBias += adjusted;
        }
        const regime = macroBias > 2
            ? "RISK_ON"
            : macroBias < -2
                ? "RISK_OFF"
                : "MIXED";
        return {
            regime,
            report
        };
    }
}
exports.CorrelationEngine = CorrelationEngine;
