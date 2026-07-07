export type PredictionRecord = {
  id: string;
  instrument: string;
  predictedDirection: "BUY" | "SELL";
  predictedStrength: number;
  timestamp: number;
};

export type OutcomeRecord = {
  id: string;
  instrument: string;
  actualDirection: "BUY" | "SELL";
  timestamp: number;
};

export class FeedbackEngine {

  private predictions: PredictionRecord[] = [];

  /**
   * Store system prediction
   */
  recordPrediction(pred: PredictionRecord) {
    this.predictions.push(pred);
  }

  /**
   * Evaluate prediction vs outcome
   */
  evaluateOutcome(outcome: OutcomeRecord) {

    const pred = this.predictions.find(p => p.id === outcome.id);

    if (!pred) return null;

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

    if (this.predictions.length === 0) return 0;

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
  generateLearningSignal(outcome: OutcomeRecord) {

    const result = this.evaluateOutcome(outcome);

    if (!result) return null;

    return {
      instrument: result.instrument,
      adjustment: result.correct ? +0.05 : -0.08,
      reason: result.correct ? "correct_prediction" : "incorrect_prediction"
    };
  }
}
