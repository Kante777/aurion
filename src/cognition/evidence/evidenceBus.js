"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceBus = void 0;
class EvidenceBus {
    registry;
    clock;
    constructor(registry, clock) {
        this.registry = registry;
        this.clock = clock;
    }
    // legacy alias (for tests)
    collect(marketData) {
        return this.ingest(marketData);
    }
    ingest(marketData) {
        const detectors = this.registry.getAll();
        const output = [];
        for (const detector of detectors) {
            try {
                const result = detector.detect(marketData);
                if (result) {
                    result.timestamp = this.clock.now();
                    output.push(result);
                }
            }
            catch {
                continue;
            }
        }
        return output;
    }
}
exports.EvidenceBus = EvidenceBus;
