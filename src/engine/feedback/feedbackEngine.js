"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackEngine = void 0;
class FeedbackEngine {
    predictions = [];
    /**
     * Store system prediction
     */
    recordPrediction(pred) {
        this.predictions.push(pred);
    }
    /**
     * Evaluate prediction vs outcome
     */
    evaluateOutcome(outcome) {
        const pred = this.predictions.find(p => p.id === outcome.id);
        if (!pred)
            return null;
        const correct = pred.predictedDirection === outcome.actualDirection;
        const error = correct ? 0 : 1;
        return {
            instrument: pred.instrument,
            correct,
            error,
            confidence: pred.predictedStrength,
            timestamp: Date.now()
        };
    }
    /**
     * Compute system accuracy
     */
    computeAccuracy() {
        if (this.predictions.length === 0)
            return 0;
        let correct = 0;
        for (const p of this.predictions) {
            // naive placeholder (real outcome matching happens in evaluate)
            if (p.predictedStrength > 0.5) {
                correct += 1;
            }
        }
        return correct / this.predictions.length;
    }
    /**
     * Generate learning signal
     */
    generateLearningSignal(outcome) {
        const result = this.evaluateOutcome(outcome);
        if (!result)
            return null;
        return {
            instrument: result.instrument,
            adjustment: result.correct ? +0.05 : -0.08,
            reason: result.correct ? "correct_prediction" : "incorrect_prediction"
        };
    }
}
exports.FeedbackEngine = FeedbackEngine;
