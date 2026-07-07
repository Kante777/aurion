import {
  MarketSnapshot
} from "../perception";


import {
  RegimeContext
} from "./marketState";


export function interpretRegime(
  snapshot: MarketSnapshot
): RegimeContext {


  const volatility =
    snapshot.volatility.value;


  if (volatility > 0.8) {
    return "VOLATILE";
  }


  if (
    snapshot.liquidity.value > 0.7
  ) {
    return "LIQUIDITY_DRIVEN";
  }


  return "NORMAL";
}
