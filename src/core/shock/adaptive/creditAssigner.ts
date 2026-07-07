export class CreditAssigner {

  assign(detectors: any[], error: number) {
    const total = detectors.length;

    return detectors.map((d, i) => {

      // simple but powerful heuristic:
      // later detectors get slightly more responsibility bias
      const positionalWeight = (i + 1) / total;

      const responsibility = error * positionalWeight;

      return {
        detector: d,
        responsibility
      };
    });
  }
}
