"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AurionRuntime = void 0;
const temporalLearningEngine_1 = require("../temporal/learning/temporalLearningEngine");
const feedbackEngine_1 = require("../feedback/feedbackEngine");
const reinforcementEngine_1 = require("../reinforcement/reinforcementEngine");
const regimeMemoryEngine_1 = require("../regime/regimeMemoryEngine");
const causalEngine_1 = require("../causal/causalEngine");
class AurionRuntime {
    temporal;
    feedback;
    regime;
    reinforcement;
    causal;
    constructor(temporal = new temporalLearningEngine_1.TemporalLearningEngine(), feedback = new feedbackEngine_1.FeedbackEngine(), regime = new regimeMemoryEngine_1.RegimeMemoryEngine(), reinforcement = new reinforcementEngine_1.ReinforcementEngine(feedback, {}, temporal), causal = new causalEngine_1.CausalEngine()) {
        this.temporal = temporal;
        this.feedback = feedback;
        this.regime = regime;
        this.reinforcement = reinforcement;
        this.causal = causal;
    }
    /**
     * MAIN PIPELINE
     */
    process(events, outcome) {
        // 1. log events
        for (const e of events) {
            this.temporal.logEvent(e);
            this.causal.log(e);
        }
        // 2. temporal learning
        this.temporal.learnFromEventFlow();
        // 3. causal graph update
        const causalGraph = this.causal.detectCausality();
        // 4. feedback loop
        let signal = null;
        if (outcome) {
            signal = this.feedback.generateLearningSignal(outcome);
            this.reinforcement.runCycle(outcome);
            // 🔥 regime learning update
            if (signal) {
                const regimeType = signal.adjustment < 0 ? "RISK_OFF" : "RISK_ON";
                this.regime.update(regimeType, signal.adjustment < 0);
            }
        }
        // 5. regime update (fallback logic)
        if (signal) {
            this.regime.update("RISK_OFF", signal.adjustment < 0);
        }
        const structure = this.temporal.getMarketStructure?.() || [];
        const graph = this.causal.getGraph();
        return {
            structure,
            causalGraph: graph.edges,
            nodes: graph.nodes,
            regime: this.regime.snapshot(),
            signal,
        };
    }
}
exports.AurionRuntime = AurionRuntime;
