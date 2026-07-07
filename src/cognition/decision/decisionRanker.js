"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionRanker = void 0;
class DecisionRanker {
    rank(opportunities) {
        return opportunities
            .filter(o => o.action !== "HOLD")
            .sort((a, b) => {
            const scoreA = a.confidence * (1 - a.riskScore);
            const scoreB = b.confidence * (1 - b.riskScore);
            return scoreB - scoreA;
        });
    }
}
exports.DecisionRanker = DecisionRanker;
