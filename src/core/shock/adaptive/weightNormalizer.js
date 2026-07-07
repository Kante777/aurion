"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightNormalizer = void 0;
class WeightNormalizer {
    static normalize(weights) {
        const sum = Object.values(weights).reduce((a, b) => a + b, 0);
        const normalized = {};
        for (const k in weights) {
            normalized[k] = weights[k] / sum;
        }
        return normalized;
    }
}
exports.WeightNormalizer = WeightNormalizer;
