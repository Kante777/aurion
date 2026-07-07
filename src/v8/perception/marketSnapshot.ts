import {
  MarketSnapshot,
  PriceState,
  VolatilityState,
  LiquidityState,
  SessionContext
} from "./perceptionTypes";


export interface MarketObservation {

  instrument: string;

  timeframe: string;

  timestamp: number;

  price: PriceState;

  volatility: VolatilityState;

  liquidity: LiquidityState;

  session: SessionContext;
}


export function createMarketSnapshot(
  observation: MarketObservation
): MarketSnapshot {

  return {
    instrument: observation.instrument,
    timeframe: observation.timeframe,
    timestamp: observation.timestamp,

    price: observation.price,

    volatility:
      observation.volatility,

    liquidity:
      observation.liquidity,

    session:
      observation.session
  };
}
