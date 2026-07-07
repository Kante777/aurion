"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveEngine = void 0;
class AdaptiveEngine {
    history = [];
    update(sample) {
        const error = sample?.error ?? 0;
        this.history.push(error);
        const avg = this.history.reduce((a, b) => a + b, 0) /
            this.history.length;
        return {
            updated: true,
            error,
            avgError: avg
        };
    }
}
exports.AdaptiveEngine = AdaptiveEngine;
