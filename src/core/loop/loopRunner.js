"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopRunner = void 0;
class LoopRunner {
    loop;
    constructor(loop) {
        this.loop = loop;
    }
    start(snapshotStream) {
        const results = [];
        for (const snapshot of snapshotStream) {
            const result = this.loop.run(snapshot);
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
exports.LoopRunner = LoopRunner;
