"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDetector = void 0;
class SessionDetector {
    name = "session_detector";
    detect(input) {
        const hour = input?.hour ?? new Date().getUTCHours();
        let score = 0;
        let session = "UNKNOWN";
        // Simplified session model (UTC-based)
        if (hour >= 6 && hour < 13) {
            session = "LONDON";
            score = 0.4;
        }
        if (hour >= 13 && hour < 20) {
            session = "NEW_YORK";
            score = 0.7;
        }
        if (hour >= 20 || hour < 6) {
            session = "ASIA";
            score = 0.3;
        }
        // volatility expectation adjustment
        const volatilityBoost = input?.volatilitySpike ? 0.3 : 0;
        score = Math.min(1, score + volatilityBoost);
        return {
            detector: this.name,
            metric: "session_context",
            rawValue: hour,
            normalizedScore: score,
            confidence: 0.75,
            explanation: `Market session detected: ${session}`,
            timestamp: Date.now(),
            metadata: { session }
        };
    }
}
exports.SessionDetector = SessionDetector;
