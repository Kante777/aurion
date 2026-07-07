"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioRiskEngine = void 0;
class PortfolioRiskEngine {
    computeRisk(positions) {
        const exposure = positions.reduce((sum, p) => sum + p.weight * p.riskContribution, 0);
        const concentrationRisk = Math.max(...positions.map(p => p.weight));
        return Math.min(1, exposure + concentrationRisk);
    }
}
exports.PortfolioRiskEngine = PortfolioRiskEngine;
