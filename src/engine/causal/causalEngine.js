"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CausalEngine = void 0;
class CausalEngine {
    events = [];
    links = [];
    log(event) {
        this.events.push(event);
    }
    detectCausality(windowMs = 5000) {
        const sorted = [...this.events].sort((a, b) => a.timestamp - b.timestamp);
        const candidates = [];
        for (let i = 0; i < sorted.length; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                const a = sorted[i];
                const b = sorted[j];
                const dt = b.timestamp - a.timestamp;
                if (dt > windowMs)
                    continue;
                const raw = this.calculateRawStrength(a, b, dt);
                const strength = this.calibrateStrength(raw);
                // 🧠 IMPORTANT: allow weak + reject noise
                if (strength > 0.45) {
                    candidates.push({
                        cause: a.instrument,
                        effect: b.instrument,
                        strength,
                        regime: this.detectRegime(a, b)
                    });
                }
            }
        }
        // 🔥 SPARSITY CONTROL (CRITICAL FIX)
        this.links = this.applyTopNPerCause(candidates, 2);
        return this.links;
    }
    // -----------------------------
    // RAW SIGNAL GENERATION
    // -----------------------------
    calculateRawStrength(a, b, dt) {
        let score = 0;
        // temporal decay (more realistic exponential falloff)
        score += Math.exp(-dt / 2500) * 0.5;
        // macro shock relevance
        if (a.data?.impact === "HIGH") {
            score += 0.25;
        }
        // instrument interaction bias (reduced, not dominant)
        if (a.instrument === "EURUSD") {
            score += 0.1;
        }
        // cross-asset coupling (small contribution)
        if (a.type === "NEWS" && b.type === "NEWS") {
            score += 0.1;
        }
        return score;
    }
    // -----------------------------
    // CALIBRATION (KEY FIX)
    // -----------------------------
    calibrateStrength(x) {
        // sigmoid compression → prevents saturation
        const sigmoid = 1 / (1 + Math.exp(-8 * (x - 0.5)));
        // scale to usable range
        return Math.max(0, Math.min(1, sigmoid));
    }
    // -----------------------------
    // REGIME DETECTION (UNCHANGED BUT CLEANER)
    // -----------------------------
    detectRegime(a, b) {
        if (a.data?.impact === "HIGH")
            return "RISK_OFF";
        return "MIXED";
    }
    // -----------------------------
    // SPARSITY ENFORCER (NEW)
    // -----------------------------
    applyTopNPerCause(links, n) {
        const grouped = new Map();
        for (const link of links) {
            if (!grouped.has(link.cause))
                grouped.set(link.cause, []);
            grouped.get(link.cause).push(link);
        }
        const result = [];
        for (const [, arr] of grouped) {
            arr.sort((a, b) => b.strength - a.strength);
            result.push(...arr.slice(0, n));
        }
        return result;
    }
    getGraph() {
        return {
            nodes: this.events,
            edges: this.links
        };
    }
}
exports.CausalEngine = CausalEngine;
