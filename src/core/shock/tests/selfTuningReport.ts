import { AdaptiveEngine } from "../adaptation/adaptiveEngine";

console.log("\n📊 SELF-TUNING VERIFICATION REPORT\n");

const adaptive = new AdaptiveEngine();

// Simulated feedback loop
const cycles = [
    { overestimate: 0.8, underestimate: 0.2 },
    { overestimate: 0.75, underestimate: 0.25 },
    { overestimate: 0.7, underestimate: 0.3 },
    { overestimate: 0.6, underestimate: 0.4 },
    { overestimate: 0.55, underestimate: 0.45 },
];

const history: any[] = [];

for (let i = 0; i < cycles.length; i++) {
    const result = adaptive.update(cycles[i]);
    const weights = adaptive.getWeights();

    history.push({
        cycle: i,
        adjustment: result,
        weights
    });
}

console.log("\n📈 ADAPTATION TRAJECTORY:\n");

history.forEach(h => {
    console.log(`Cycle ${h.cycle}:`, h.adjustment);
});

console.log("\n🧠 FINAL WEIGHTS:", adaptive.getWeights());

console.log("\n📊 SELF-TUNING REPORT COMPLETE\n");