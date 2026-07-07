"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityAgent = void 0;
const baseAgent_1 = require("../baseAgent");
class LiquidityAgent extends baseAgent_1.BaseAgent {
    decide(state) {
        const sweepDetected = state?.belief?.sweep || false;
        return {
            agentId: this.id,
            bias: sweepDetected ? "BUY" : "HOLD",
            confidence: sweepDetected ? 0.8 : 0.4,
            reasoning: [
                "Liquidity sweep detection logic",
                "Stop hunt behavior tracking",
                "Execution-side imbalance focus"
            ]
        };
    }
}
exports.LiquidityAgent = LiquidityAgent;
