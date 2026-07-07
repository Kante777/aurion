import {
  MarketSnapshot
} from "../perception";


import {
  MarketStructure,
  MarketTrend
} from "./marketState";


export function interpretTrend(
  snapshot: MarketSnapshot
): MarketTrend {


  const {
    open,
    close
  } = snapshot.price;


  if (close > open) {
    return "BULLISH";
  }


  if (close < open) {
    return "BEARISH";
  }


  return "NEUTRAL";
}



export function interpretStructure(
  snapshot: MarketSnapshot
): MarketStructure {


  const range =
    snapshot.price.high -
    snapshot.price.low;


  if (range > 0) {
    return "EXPANSION";
  }


  return "CONSOLIDATION";
}
