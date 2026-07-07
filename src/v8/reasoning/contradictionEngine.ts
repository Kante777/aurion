import {
  Evidence
} from "./evidence";


export function detectContradictions(
  evidence: Evidence[]
): Evidence[] {


  const contradictions: Evidence[] = [];


  const bullish =
    evidence.some(
      e =>
        e.value === "BULLISH"
    );


  const volatile =
    evidence.some(
      e =>
        e.value === "EXTREME"
    );


  if (
    bullish &&
    volatile
  ) {

    contradictions.push({

      source:
        "contradiction_engine",

      category:
        "VOLATILITY",

      confidence:
        0.7,

      value:
        "BULLISH_STRUCTURE_WITH_HIGH_VOLATILITY"
    });
  }


  return contradictions;
}
