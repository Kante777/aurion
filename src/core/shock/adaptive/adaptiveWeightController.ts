export class AdaptiveWeightController {
  private adjustments: Record<string, number> = {};

  update(detector: string, error: number) {
    const current = this.adjustments[detector] ?? 0;

    // 🔥 stronger learning signal
    const learningRate = 0.2;

    // reward good predictions, punish bad ones
    const delta = (1 - error) * learningRate - error * learningRate;

    this.adjustments[detector] = current + delta;
  }

  get(detector: string) {
    return this.adjustments[detector] ?? 0;
  }

  snapshot() {
    return { ...this.adjustments };
  }
}
