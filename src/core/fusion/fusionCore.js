"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionCore = void 0;
const adaptiveFusionBridge_1 = require("../shock/adaptive/adaptiveFusionBridge");
const regimeEngine_1 = require("../shock/v7/regime/regimeEngine");
const applyRegimeToLearning_1 = require("../shock/v7/regime/applyRegimeToLearning");
class FusionCore {
    bridge;
    constructor(initial = {
        volatility_detector: 0.33,
        liquidity_detector: 0.33,
        spread_detector: 0.34
    }) {
        this.bridge = new adaptiveFusionBridge_1.AdaptiveFusionBridgeV5();
    }
    fuse(evidence) {
        return this.bridge.fuse(evidence);
    }
    learn(state, evidence, fusionResult) {
        const regime = regimeEngine_1.regimeEngine.analyze({
            volatility: fusionResult.shockScore ?? 0,
            liquidity: evidence[1]?.score ?? 0,
            spread: evidence[2]?.score ?? 0
        });
        const adjusted = (0, applyRegimeToLearning_1.applyRegimeToLearning)(this.bridge.getWeights(), regime.regime);
        return this.bridge.applyOutcome(state, evidence, {
            ...fusionResult,
            adjustedWeights: adjusted
        });
    }
    getBridge() {
        return this.bridge;
    }
    getAdaptiveBridge() {
        return this.bridge;
    }
}
exports.FusionCore = FusionCore;
