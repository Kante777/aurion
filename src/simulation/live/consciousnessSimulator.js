"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsciousnessSimulator = void 0;
const marketStimulus_1 = require("./marketStimulus");
class ConsciousnessSimulator {
    loopRunner;
    constructor(loopRunner) {
        this.loopRunner = loopRunner;
    }
    runStressTest() {
        const stimulus = new marketStimulus_1.MarketStimulus().generateShockStream();
        const snapshots = [];
        for (const event of stimulus) {
            const snapshot = {
                market: event,
                cognition: {
                    noise: Math.random(),
                    confidence: 0.5 + Math.random() * 0.5
                },
                timestamp: Date.now()
            };
            snapshots.push(snapshot);
        }
        console.log("🌐 LIVE MARKET STRESS TEST STARTED");
        const results = this.loopRunner.start(snapshots);
        console.log("🧠 STRESS TEST COMPLETE");
        return {
            snapshots,
            results
        };
    }
}
exports.ConsciousnessSimulator = ConsciousnessSimulator;
