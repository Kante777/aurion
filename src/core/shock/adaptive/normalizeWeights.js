"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeWeights = normalizeWeights;
function normalizeWeights(weights) {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    if (sum === 0)
        return weights;
    const out = {};
    for (const k in weights) {
        out[k] = weights[k] / sum;
    }
    return out;
}
