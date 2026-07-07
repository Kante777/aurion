export class ErrorModel {
  private map: Record<string, number> = {
    CALM: 0,
    ACTIVE: 1,
    FRAGILE: 2,
    CRISIS: 3
  };

  compute(predicted: string, actual: string): number {
    const p = this.map[predicted] ?? 0;
    const a = this.map[actual] ?? 0;

    const diff = Math.abs(p - a);

    // normalized error (0 → 1)
    return diff / 3;
  }
}
