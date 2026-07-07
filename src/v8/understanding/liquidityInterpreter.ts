import {
  MarketSnapshot
} from "../perception";


import {
  LiquidityCondition
} from "./marketState";


export function interpretLiquidity(
  snapshot: MarketSnapshot
): LiquidityCondition {


  const value =
    snapshot.liquidity.value;


  if (value > 0.7) {
    return "ACCUMULATING";
  }


  if (value < 0.3) {
    return "DISTRIBUTING";
  }


  return "BALANCED";
}
