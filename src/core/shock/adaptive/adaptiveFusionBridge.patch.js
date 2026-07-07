"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRegimeCoupledLearning = applyRegimeCoupledLearning;
function applyRegimeCoupledLearning(weights, error) {
    const keys = Object.keys(weights);
    const adjusted = {};
    let total = 0;
    for (const k of keys) {
        const delta = (1 - error) * weights[k] + error * (1 / keys.length);
        adjusted[k] = delta;
        total += delta;
    }
    // normalize
    for (const k of keys) {
        adjusted[k] = adjusted[k] / total;
    }
    return adjusted;
}
