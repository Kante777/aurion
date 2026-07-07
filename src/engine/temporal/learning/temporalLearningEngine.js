"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalLearningEngine = void 0;
class TemporalLearningEngine {
    eventLog = [];
    scores = new Map([
        ["EURUSD", { leadScore: 0.5, lagScore: 0.5, lastUpdated: Date.now() }],
        ["GBPUSD", { leadScore: 0.5, lagScore: 0.5, lastUpdated: Date.now() }],
        ["XAUUSD", { leadScore: 0.5, lagScore: 0.5, lastUpdated: Date.now() }],
        ["NAS100", { leadScore: 0.5, lagScore: 0.5, lastUpdated: Date.now() }]
    ]);
    /**
     * Log market event (macro or micro)
     */
    logEvent(event) {
        this.eventLog.push(event);
    }
    /**
     * Detect first mover in a time window
     */
    detectFirstMover(windowMs = 5000) {
        const now = Date.now();
        const recent = this.eventLog.filter(e => now - e.timestamp <= windowMs);
        if (recent.length < 2)
            return null;
        // sort by time → earliest = leader
        const sorted = [...recent].sort((a, b) => a.timestamp - b.timestamp);
        return {
            leader: sorted[0].instrument,
            followers: sorted.slice(1).map(e => e.instrument)
        };
    }
    /**
     * Reinforce learning based on observed flow
     */
    learnFromEventFlow(windowMs = 5000) {
        const result = this.detectFirstMover(windowMs);
        if (!result)
            return;
        const { leader, followers } = result;
        this.updateLeader(leader);
        followers.forEach(f => this.updateFollower(f));
    }
    /**
     * Strengthen leader score
     */
    updateLeader(instrument) {
        const current = this.scores.get(instrument);
        if (!current)
            return;
        this.scores.set(instrument, {
            leadScore: this.clamp(current.leadScore + 0.05),
            lagScore: this.clamp(current.lagScore - 0.02),
            lastUpdated: Date.now()
        });
    }
    /**
     * Strengthen lag score
     */
    updateFollower(instrument) {
        const current = this.scores.get(instrument);
        if (!current)
            return;
        this.scores.set(instrument, {
            leadScore: this.clamp(current.leadScore - 0.02),
            lagScore: this.clamp(current.lagScore + 0.05),
            lastUpdated: Date.now()
        });
    }
    /**
     * Get learned profile
     */
    getProfile(instrument) {
        return this.scores.get(instrument);
    }
    /**
     * Clamp values between 0 and 1
     */
    clamp(value) {
        return Math.max(0, Math.min(1, value));
    }
    /**
     * View learned market structure
     */
    getMarketStructure() {
        return Array.from(this.scores.entries()).map(([instrument, score]) => ({
            instrument,
            ...score
        }));
    }
}
exports.TemporalLearningEngine = TemporalLearningEngine;
