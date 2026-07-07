import { RegimeState } from "./regimeEngine";


export function applyRegimeToLearning(
  weights: Record<string, number>,
  regime: RegimeState
){

  const updated = {
    ...weights
  };


  switch(regime){

    case "VOLATILE":

      updated.volatility_detector *= 1.4;

      break;


    case "STABLE":

      updated.liquidity_detector *= 1.2;

      break;


    case "LIQUIDITY_DRIVEN":

      updated.liquidity_detector *= 1.25;

      break;

  }


  return updated;

}
