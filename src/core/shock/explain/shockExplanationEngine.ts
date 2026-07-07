export class ShockExplanationEngine {

    explain(input: {
        fusion: any,
        shock: any,
        memory: any
    }) {

        const { fusion, shock, memory } = input;

        // 🔍 find dominant contributors
        const topDrivers = (fusion.contributions || [])
            .sort((a: any, b: any) => b.weight - a.weight)
            .slice(0, 3);

        const explanations: string[] = [];

        // 🧠 shock logic explanation
        if (shock.acceleration > 0.05) {
            explanations.push("Momentum is accelerating sharply across recent cycles.");
        }

        if (shock.divergence > 0.3) {
            explanations.push("Detector disagreement is increasing (structural instability).");
        }

        if (shock.shockScore > 0.65) {
            explanations.push("System has entered high-stress regime.");
        }

        // 🧠 memory explanation
        if (memory.memorySimilarity > 0.75) {
            explanations.push(
                `Current structure closely matches pattern: ${memory.closestPattern}`
            );
        } else if (memory.memorySimilarity > 0.5) {
            explanations.push(
                "Moderate similarity to historical instability patterns detected."
            );
        } else {
            explanations.push("No strong historical match found (novel regime).");
        }

        // 🧠 driver breakdown
        const driverInsight = topDrivers.map((d: any) =>
            `${d.detector} contributed ${(d.weight * 100).toFixed(1)}% influence`
        );

        return {
            summary: explanations.join(" "),
            drivers: driverInsight,
            riskDrivers: topDrivers.map((d: any) => d.detector),
            confidence: Math.min(
                1,
                (shock.shockScore + shock.divergence + shock.acceleration) / 3
            )
        };
    }
}
