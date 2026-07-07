
import { StabilityReport, StabilityViolation } from "./stabilityTypes";

export class StabilityKernel {

  checkConsistency(systemState: any): StabilityReport {

    const violations: StabilityViolation[] = [];

    const modules = Object.keys(systemState || {});



    for (let i = 0; i < modules.length; i++) {
      for (let j = i + 1; j < modules.length; j++) {

        const a = systemState[modules[i]];
        const b = systemState[modules[j]];

        if (!a || !b) continue;

        // simple contradiction heuristic
        if (a.state && b.state && a.state !== b.state) {

          violations.push({
            moduleA: modules[i],
            moduleB: modules[j],
            conflictType: "STATE_MISMATCH",
            severity: Math.random()
          });
        }
      }
    }

    const coherenceScore =
      1 - (violations.length / Math.max(1, modules.length));

    return {
      stable: coherenceScore > 0.7,
      violations,
      coherenceScore
    };
  }

  resolve(report: StabilityReport): any {

    if (report.stable) {
      return {
        status: "STABLE",
        action: "NONE_REQUIRED"
      };
    }

    const actions = report.violations.map(v => ({
      target: `${v.moduleA}-${v.moduleB}`,
      action:
        v.severity > 0.7
          ? "FORCE_STATE_ALIGNMENT"
          : "SOFT_RESYNC"
    }));

    return {
      status: "UNSTABLE",
      actions
    };
  }
}
