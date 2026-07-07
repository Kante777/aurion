import { UnifiedLoop } from "./unifiedLoop";

export class LoopRunner {

  constructor(private loop: UnifiedLoop) {}

  start(snapshotStream: any[]) {

    const results = [];

    for (const snapshot of snapshotStream) {

      const result: any = this.loop.run(snapshot);

      results.push(result);

      console.log("🧠 LOOP CYCLE COMPLETE:", {
        decision: result?.decision?.marketState ?? "UNKNOWN",
        execution: result?.execution ?? {},
        health: result?.health ?? {},
        stability: result?.stability?.report ?? {},
        sovereign: result?.sovereign ?? {}
      });
    }

    return results;
  }
}
