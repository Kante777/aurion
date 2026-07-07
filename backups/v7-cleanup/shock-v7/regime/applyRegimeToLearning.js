"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRegimeToLearning = applyRegimeToLearning;
function applyRegimeToLearning(weights, regime) {
    const updated = {
        ...weights
    };
    switch (regime) {
        case "VOLATILE":
            updated.volatility_detector *= 1.4;
            break;
        case "STABLE":
            updated.liquidity_detector *= 1.2;
            break;
        case "LIQUIDITY_DRIVEN":
            updated.liquidity_detector *= 1.25;
            break;
    }
    return updated;
}
