
import { FusionEngine } from "../../cognition/fusion/fusionEngine";
import { StabilityKernel } from "../../cognition/stability/stabilityKernel";
import { HealingEngine } from "../../cognition/healing/healingEngine";
import { SovereigntyCore } from "../../cognition/sovereignty/sovereigntyCore";
import { ExecutionEngine } from "../../execution/autonomous/executionEngine";

export class UnifiedLoop {

  constructor(
    private fusion: FusionEngine,
    private stability: StabilityKernel,
    private healing: HealingEngine,
    private sovereignty: SovereigntyCore,
    private execution: ExecutionEngine
  ) {}

  run(snapshot: any) {

   
    const decision = this.fusion.fuse(snapshot);

 
    const stabilityReport = this.stability.checkConsistency(snapshot);

    const stabilityAction = this.stability.resolve(stabilityReport);


    const health = this.healing.runHealingCycle(snapshot);


    const sovereign = this.sovereignty.lockDecision(
      decision.dominantSignal
    );



    const execution = this.execution.execute({
      instrument: "EURUSD",
      direction: decision.dominantSignal.includes("BUY")
        ? "BUY"
        : "SELL",
      confidence: decision.confidence,
      riskLevel: decision.riskLevel,
      reason: decision.marketState
    });

 

    return {
      timestamp: Date.now(),
      decision,
      execution,
      health,
      stability: {
        report: stabilityReport,
        action: stabilityAction
      },
      sovereign
    };
  }
}
