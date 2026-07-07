"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionAggregator = void 0;
class DecisionAggregator {
    aggregate(instrument, decisions) {
        let buy = 0;
        let sell = 0;
        let hold = 0;
        const contributors = [];
        for (const d of decisions) {
            contributors.push(d.agentId);
            if (d.bias === "BUY")
                buy += d.confidence;
            if (d.bias === "SELL")
                sell += d.confidence;
            if (d.bias === "HOLD")
                hold += d.confidence;
        }
        const total = buy + sell + hold || 1;
        const buyP = buy / total;
        const sellP = sell / total;
        const holdP = hold / total;
        let action = "HOLD";
        if (buyP > sellP && buyP > holdP)
            action = "BUY";
        if (sellP > buyP && sellP > holdP)
            action = "SELL";
        const confidence = Math.max(buyP, sellP, holdP);
        return {
            instrument,
            action,
            confidence,
            contributors,
            rationale: [
                "Normalized institutional consensus model",
                "Probability-distributed agent weighting",
                "Conflict-resolved decision synthesis"
            ]
        };
    }
}
exports.DecisionAggregator = DecisionAggregator;
