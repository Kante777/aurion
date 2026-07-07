import {
  Evidence
} from "./evidence";


export function calculateProbability(
  evidence: Evidence[]
): number {


  if (
    evidence.length === 0
  ) {
    return 0;
  }


  const confidence =
    evidence.reduce(
      (
        sum,
        item
      ) =>
        sum + item.confidence,
      0
    );


  return Math.min(
    confidence /
    evidence.length,
    1
  );
}
