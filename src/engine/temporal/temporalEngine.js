"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalEngine = void 0;
class TemporalEngine {
    history = new Map();
    profiles = new Map([
        ["EURUSD", { leadScore: 0.8, lagScore: 0.2, reactionDelay: 100 }],
        ["GBPUSD", { leadScore: 0.5, lagScore: 0.5, reactionDelay: 250 }],
        ["XAUUSD", { leadScore: 0.3, lagScore: 0.7, reactionDelay: 400 }],
        ["NAS100", { leadScore: 0.6, lagScore: 0.4, reactionDelay: 200 }],
    ]);
    addEvent(instrument, event) {
        if (!this.history.has(instrument)) {
            this.history.set(instrument, []);
        }
        this.history.get(instrument).push(event);
    }
    getProfile(instrument) {
        return this.profiles.get(instrument) || {
            leadScore: 0.5,
            lagScore: 0.5,
            reactionDelay: 300
        };
    }
    /**
     * Detects whether an instrument is likely a LEADER or FOLLOWER
     */
    classifyInstrument(instrument) {
        const profile = this.getProfile(instrument);
        if (profile.leadScore > 0.65)
            return "LEADER";
        if (profile.lagScore > 0.65)
            return "FOLLOWER";
        return "NEUTRAL";
    }
    /**
     * Computes temporal influence weight
     */
    temporalWeight(instrument) {
        const profile = this.getProfile(instrument);
        // stronger leaders have higher predictive weight
        return profile.leadScore - profile.lagScore;
    }
    /**
     * Builds market flow ordering
     */
    buildFlowOrder(instruments) {
        return instruments
            .map(i => ({
            instrument: i,
            type: this.classifyInstrument(i),
            weight: this.temporalWeight(i),
            delay: this.getProfile(i).reactionDelay
        }))
            .sort((a, b) => b.weight - a.weight);
    }
    /**
     * Detects potential lead-lag signal propagation
     */
    detectFlowShift(a, b) {
        const aProfile = this.getProfile(a);
        const bProfile = this.getProfile(b);
        const aLeadsB = aProfile.leadScore > bProfile.leadScore &&
            aProfile.reactionDelay < bProfile.reactionDelay;
        return {
            pair: `${a}-${b}`,
            aLeadsB,
            strength: (aProfile.leadScore - bProfile.leadScore) *
                (bProfile.reactionDelay - aProfile.reactionDelay)
        };
    }
}
exports.TemporalEngine = TemporalEngine;
