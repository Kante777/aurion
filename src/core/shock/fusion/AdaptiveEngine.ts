export class AdaptiveEngine {

  private history: number[] = [];

  update(sample: any) {
    const error = sample?.error ?? 0;

    this.history.push(error);

    const avg =
      this.history.reduce((a, b) => a + b, 0) /
      this.history.length;

    return {
      updated: true,
      error,
      avgError: avg
    };
  }
}
