"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConservativeAgent = void 0;
const baseAgent_1 = require("../baseAgent");
class ConservativeAgent extends baseAgent_1.BaseAgent {
    decide(state) {
        const confidence = state.belief?.confidence || 0.5;
        return {
            agentId: this.id,
            bias: confidence > 0.7 ? "BUY" : "HOLD",
            confidence: confidence * 0.8,
            reasoning: [
                "Needs structural alignment",
                "Avoids premature entries",
                "Prefers confirmation clusters"
            ]
        };
    }
}
exports.ConservativeAgent = ConservativeAgent;
