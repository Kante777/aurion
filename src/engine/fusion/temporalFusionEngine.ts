import { CorrelationEngine } from "../correlation/correlationEngine";
import { TemporalEngine } from "../temporal/temporalEngine";
import { TemporalLearningEngine } from "../temporal/learning/temporalLearningEngine";

export class TemporalFusionEngine {

  constructor(
    private correlation: CorrelationEngine,
    private temporal: TemporalEngine,
    private learning: TemporalLearningEngine
  ) {}

  /**
   * Build unified causal intelligence view
   */
  analyze(instruments: string[]) {

    const report: any[] = [];

    let globalBias = 0;

    const flowOrder = this.temporal.buildFlowOrder(instruments);

    for (const instrument of instruments) {

      // =========================
      // 1. CORRELATION CONTEXT
      // =========================
      const events = (this.correlation as any).marketStates?.get(instrument) || [];
      const rawSentiment = this.calculateRaw(events);
      const correlationAdjusted = this.applyCorrelation(instrument, rawSentiment);

      // =========================
      // 2. TEMPORAL CONTEXT
      // =========================
      const temporalWeight = this.temporal.temporalWeight(instrument);

      // =========================
      // 3. LEARNING CONTEXT
      // =========================
      const learned = this.learning.getProfile(instrument);
      const leadScore = learned?.leadScore ?? 0.5;

      // =========================
      // 4. FINAL CAUSAL SCORE
      // =========================
      const finalScore =
        correlationAdjusted *
        temporalWeight *
        leadScore;

      report.push({
        instrument,
        rawSentiment,
        correlationAdjusted,
        temporalWeight,
        leadScore,
        finalScore
      });

      globalBias += finalScore;
    }

    const regime =
      globalBias > 2
        ? "RISK_ON"
        : globalBias < -2
        ? "RISK_OFF"
        : "MIXED";

    return {
      regime,
      flowOrder,
      report
    };
  }

  /**
   * reuse same logic pattern as correlation engine
   */
  private calculateRaw(events: any[]) {
    let sentiment = 0;

    for (const e of events) {
      if (e.type === "NEWS") {
        sentiment += e.data.impact === "HIGH" ? -2 : -1;
      }
      if (e.type === "BELIEF") {
        sentiment += e.data.direction === "BUY" ? 1 : -1;
      }
    }

    return sentiment;
  }

  private applyCorrelation(instrument: string, raw: number) {

    // lightweight placeholder (correlation engine should be injected later properly)
    return raw * 1.1;
  }
}
