"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionEngine = void 0;
class CompressionEngine {
    compress(events) {
        return (events || []).map((e, i) => ({
            id: `pattern_${i}`,
            label: "AUTO",
            pattern: "clustered_event",
            frequency: 1,
            successRate: 0.5,
            confidence: 0.5,
            avgReward: 0.0,
            description: "auto-generated compressed pattern",
            data: e
        }));
    }
}
exports.CompressionEngine = CompressionEngine;
