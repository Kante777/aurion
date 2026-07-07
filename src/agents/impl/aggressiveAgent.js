"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggressiveAgent = void 0;
const baseAgent_1 = require("../baseAgent");
class AggressiveAgent extends baseAgent_1.BaseAgent {
    decide(state) {
        const confidence = state.belief?.confidence || 0.5;
        return {
            agentId: this.id,
            bias: confidence > 0.55 ? "BUY" : "SELL",
            confidence: confidence + 0.1,
            reasoning: [
                "Momentum-first reasoning",
                "Early entry bias",
                "Lower confirmation threshold"
            ]
        };
    }
}
exports.AggressiveAgent = AggressiveAgent;
