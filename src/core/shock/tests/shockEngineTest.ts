import { FusionCore } from "../../fusion/fusionCore";
import { ShockEngine } from "../engine/shockEngine";

function runTest() {

    const fusion = new FusionCore();
    const engine = new ShockEngine();

    const samples = [
        0.45,
        0.48,
        0.52,
        0.58,
        0.63,
        0.70,
        0.78
    ];

    for (const shock of samples) {

        const mockEvidence = [
            { detector: "volatility_detector", score: shock, confidence: 0.85 },
            { detector: "liquidity_detector", score: shock * 0.9, confidence: 0.80 },
            { detector: "spread_detector", score: shock * 0.7, confidence: 0.78 }
        ];

        const fusionResult = fusion.fuse(mockEvidence);

        const result = engine.analyze(fusionResult);

        console.log("\n🧠 SHOCK ANALYSIS:");
        console.log({
            shockScore: result.shockScore.toFixed(3),
            acceleration: result.acceleration.toFixed(3),
            divergence: result.divergence.toFixed(3),
            state: result.state,
            earlyWarning: result.earlyWarning
        });
    }
}

runTest();
