import { DivergenceEngine } from "./divergenceEngine";
import { ShockMemoryEngine } from "../memory/shockMemoryEngine";
import { ShockExplanationEngine } from "../explain/shockExplanationEngine";
import { ShockActionEngine } from "../action/shockActionEngine";
import { ShockAdaptiveWeightEngine } from "../adaptation/shockAdaptiveWeightEngine";

export class ShockEngine {

    private divergenceEngine = new DivergenceEngine();
    private memoryEngine = new ShockMemoryEngine();
    private explainEngine = new ShockExplanationEngine();
    private actionEngine = new ShockActionEngine();
    private adaptiveEngine = new ShockAdaptiveWeightEngine();

    private lastShock = 0;

    analyze(fusionResult: any, calibrationData?: any) {

        const shockScore = Number(fusionResult.shockScore ?? 0);
        const acceleration = shockScore - this.lastShock;

        const divergence = this.divergenceEngine.compute(
            fusionResult.contributions || []
        );

        const state =
            shockScore > 0.75 ? "CRITICAL" :
            shockScore > 0.45 ? "ACTIVE" :
            "CALM";

        const memory = this.memoryEngine.process({
            shockScore,
            acceleration,
            divergence,
            state,
            timestamp: Date.now()
        });

        // 🧠 ADAPTATION STEP (NEW)
        let adaptationResult = null;

        if (calibrationData) {
            adaptationResult = this.adaptiveEngine.adapt(calibrationData);
        }

        const explanation = this.explainEngine.explain({
            fusion: fusionResult,
            shock: { shockScore, acceleration, divergence },
            memory
        });

        const action = this.actionEngine.decide({
            shockScore,
            acceleration,
            divergence,
            memorySimilarity: memory.memorySimilarity,
            predictedOutcome: memory.predictedOutcome
        });

        const earlyWarning =
            (acceleration > 0.08 && divergence > 0.35) ||
            shockScore > 0.65;

        this.lastShock = shockScore;

        return {
            shockScore,
            acceleration,
            divergence,
            state,
            earlyWarning,

            // 🧠 MEMORY
            memorySimilarity: memory.memorySimilarity,
            closestPattern: memory.closestPattern,
            predictedOutcome: memory.predictedOutcome,

            // 🧠 EXPLANATION
            explanation: explanation.summary,
            drivers: explanation.drivers,
            riskDrivers: explanation.riskDrivers,
            confidence: explanation.confidence,

            // 🧠 ACTION
            ...action,

            // 🧠 ADAPTATION (NEW)
            adaptation: adaptationResult
        };
    }
}
