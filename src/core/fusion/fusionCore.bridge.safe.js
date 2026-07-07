"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureBridge = ensureBridge;
function ensureBridge(bridge) {
    if (!bridge.applyOutcome) {
        throw new Error("AdaptiveFusionBridge missing applyOutcome()");
    }
    if (!bridge.getWeights) {
        throw new Error("AdaptiveFusionBridge missing getWeights()");
    }
    return bridge;
}
