export class ConfidenceCalibrationEngine {

    private history: any[] = [];

    record(prediction: {
        shockScore: number,
        predictedRisk: string,
        actualOutcome: string
    }) {
        this.history.push(prediction);

        if (this.history.length > 1000) {
            this.history.shift();
        }
    }

    accuracy() {

        const total = this.history.length;
        if (total === 0) return 0;

        let correct = 0;

        for (const h of this.history) {

            const predicted =
                h.predictedRisk === "CRITICAL" && h.actualOutcome === "CRASH" ? true :
                h.predictedRisk === "HIGH" && h.actualOutcome !== "CRASH" ? true :
                h.predictedRisk === "LOW" && h.actualOutcome === "STABLE" ? true :
                false;

            if (predicted) correct++;
        }

        return correct / total;
    }

    bias() {

        const overestimate = this.history.filter(h =>
            h.predictedRisk === "CRITICAL" &&
            h.actualOutcome !== "CRASH"
        ).length;

        const underestimate = this.history.filter(h =>
            h.predictedRisk !== "CRITICAL" &&
            h.actualOutcome === "CRASH"
        ).length;

        return {
            overestimate,
            underestimate
        };
    }
}
