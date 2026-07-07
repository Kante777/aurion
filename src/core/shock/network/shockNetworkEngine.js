"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockNetworkEngine = void 0;
class ShockNetworkEngine {
    computeCorrelation(inputs) {
        const { eurusd, xauusd, nas100 } = inputs;
        // 🧠 simplified coupling model
        const goldShock = xauusd * 0.9;
        const indexShock = nas100 * 1.1;
        const fxShock = eurusd;
        const systemicShock = (goldShock + indexShock + fxShock) / 3;
        const decoupling = Math.abs(eurusd - xauusd) +
            Math.abs(xauusd - nas100);
        return {
            systemicShock,
            decoupling,
            regime: decoupling > 0.8 ? "FRAGMENTED" : "COUPLED"
        };
    }
}
exports.ShockNetworkEngine = ShockNetworkEngine;
