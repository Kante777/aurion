"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = feedback;
function feedback(fusion, state, evidence, result) {
    const bridge = fusion.getAdaptiveBridge();
    return bridge.applyOutcome(state, evidence, result);
}
