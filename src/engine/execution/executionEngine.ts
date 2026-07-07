import { EventBus } from "../../core/bus/eventBus";
import { ExecutionCandidate } from "./executionTypes";

export class ExecutionEngine {
  private executions: Map<string, ExecutionCandidate> = new Map();

  constructor(private bus: EventBus) {
    this.register();
  }

  private register() {
    this.bus.on("SETUP_GENERATED", (setup: any) => {
      this.process(setup);
    });
  }

  private process(setup: any) {
    if (setup.confidence < 0.6) return;

    const entry = this.refineEntry(setup);
    const stop = this.refineStop(setup, entry);
    const targets = this.refineTargets(setup, entry);

    const riskPercent = this.calculateRisk(setup.confidence, setup.confluenceScore);

    const positionSize = this.calculatePositionSize(riskPercent, entry, stop);

    const rr = this.calculateRR(entry, stop, targets);

    const executionScore = this.calculateExecutionScore(
      setup.confidence,
      setup.confluenceScore,
      rr,
      riskPercent
    );

    const execution: ExecutionCandidate = {
      id: crypto.randomUUID(),
      instrument: setup.instrument,
      direction: setup.direction,
      entry,
      stopLoss: stop,
      takeProfit: targets,
      riskPercent,
      positionSize,
      rrRatio: rr,
      confidence: setup.confidence,
      executionScore,
      reasoning: this.buildReasoning(setup, rr, riskPercent),
      timestamp: Date.now(),
    };

    this.executions.set(setup.instrument, execution);

    this.bus.emit("EXECUTION_CANDIDATE_CREATED", execution);
  }

  // =========================
  // PRICE INTELLIGENCE LAYER
  // =========================

  private refineEntry(setup: any): number {
    const mid = (setup.entryZone.low + setup.entryZone.high) / 2;

    // micro-adjustment logic (Phase 11 will replace with liquidity engine precision)
    return mid;
  }

  private refineStop(setup: any, entry: number): number {
    const buffer = 0.0015;

    if (setup.direction === "BUY") {
      return entry - buffer;
    }

    return entry + buffer;
  }

  private refineTargets(setup: any, entry: number): number[] {
    const rr1 = 2;
    const rr2 = 3;

    if (setup.direction === "BUY") {
      return [
        entry + 0.0020 * rr1,
        entry + 0.0020 * rr2,
      ];
    }

    return [
      entry - 0.0020 * rr1,
      entry - 0.0020 * rr2,
    ];
  }

  // =========================
  // RISK MODEL
  // =========================

  private calculateRisk(confidence: number, confluence: number): number {
    const base = 2.0; // 2% max baseline risk

    const adjustment = (confidence + confluence / 100) / 2;

    return Math.max(0.25, base * adjustment);
  }

  private calculatePositionSize(
    riskPercent: number,
    entry: number,
    stop: number
  ): number {
    const riskAmount = riskPercent / 100;

    const distance = Math.abs(entry - stop);

    if (distance === 0) return 0;

    return riskAmount / distance;
  }

  private calculateRR(
    entry: number,
    stop: number,
    targets: number[]
  ): number {
    const risk = Math.abs(entry - stop);
    const reward = Math.abs(targets[0] - entry);

    if (risk === 0) return 0;

    return reward / risk;
  }

  private calculateExecutionScore(
    confidence: number,
    confluence: number,
    rr: number,
    risk: number
  ): number {
    return (
      confidence * 40 +
      (confluence / 100) * 30 +
      Math.min(rr / 3, 1) * 20 +
      (1 - risk / 2) * 10
    );
  }

  private buildReasoning(
    setup: any,
    rr: number,
    risk: number
  ): string[] {
    return [
      `Setup Confidence: ${setup.confidence}`,
      `Confluence Score: ${setup.confluenceScore}`,
      `Risk Adjusted: ${risk.toFixed(2)}%`,
      `Risk-Reward Ratio: ${rr.toFixed(2)}`,
    ];
  }

  getExecution(instrument: string) {
    return this.executions.get(instrument);
  }
}
