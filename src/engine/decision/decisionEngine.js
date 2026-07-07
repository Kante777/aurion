"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngine = void 0;
const decisionAggregator_1 = require("./decisionAggregator");
class DecisionEngine {
    aggregator = new decisionAggregator_1.DecisionAggregator();
    run(instrument, agentDecisions) {
        return this.aggregator.aggregate(instrument, agentDecisions);
    }
}
exports.DecisionEngine = DecisionEngine;
