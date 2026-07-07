import { FeedbackEngine } from "../feedback/feedbackEngine";
import { CorrelationEngine } from "../correlation/correlationEngine";
import { TemporalEngine } from "../temporal/temporalEngine";

export class ReinforcementEngine {

  constructor(
    private feedback: FeedbackEngine,
    private correlation: CorrelationEngine,
    private temporal: TemporalEngine
  ) {}

  /**
   * Apply learning signal across all subsystems
   */
  applyLearning(signal: any) {

    if (!signal) return;

    const { instrument, adjustment } = signal;

    // =========================
    // 1. UPDATE TEMPORAL LEAD SCORE
    // =========================
    const profile = (this.temporal as any).profiles?.get(instrument);

    if (profile) {
      profile.leadScore = this.clamp(profile.leadScore + adjustment);
      profile.lagScore = this.clamp(profile.lagScore - adjustment);
    }

    // =========================
    // 2. UPDATE CORRELATION STRENGTH (simplified global shift)
    // =========================
    const matrix = (this.correlation as any).correlationMatrix;

    if (matrix) {
      for (const [key, value] of matrix.entries()) {
        matrix.set(key, this.clamp(value + adjustment * 0.1));
      }
    }

    // =========================
    // 3. LOG UPDATE
    // =========================
    console.log("🧠 REINFORCEMENT APPLIED:", {
      instrument,
      adjustment
    });
  }

  /**
   * Run full feedback cycle
   */
  runCycle(outcome: any) {

    const signal = this.feedback.generateLearningSignal(outcome);

    if (!signal) return;

    this.applyLearning(signal);
  }

  private clamp(v: number) {
    return Math.max(-1, Math.min(1, v));
  }
}
