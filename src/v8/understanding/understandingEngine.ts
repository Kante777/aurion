import {
  CognitiveInput,
  CognitiveOutput
} from "../contracts/cognition";


import {
  MarketSnapshot
} from "../perception";


import {
  MarketState
} from "./marketState";


import {
  interpretTrend,
  interpretStructure
} from "./structureInterpreter";


import {
  interpretLiquidity
} from "./liquidityInterpreter";


import {
  interpretRegime
} from "./regimeContext";



export class UnderstandingEngine {


  async execute(
    input: CognitiveInput<MarketSnapshot>
  ): Promise<CognitiveOutput<MarketState>> {


    const snapshot =
      input.payload;


    const state: MarketState = {

      instrument:
        snapshot.instrument,

      timeframe:
        snapshot.timeframe,

      trend:
        interpretTrend(snapshot),

      structure:
        interpretStructure(snapshot),

      liquidity:
        interpretLiquidity(snapshot),

      regime:
        interpretRegime(snapshot),

      confidence:
        0.8,

      timestamp:
        snapshot.timestamp
    };


    return {

      phase:
        "UNDERSTANDING",

      confidence:
        0.8,

      result:
        state,

      evidence: [
        {
          source:
            "market_state_interpreter",

          confidence:
            0.8,

          value:
            state
        }
      ]
    };
  }
}
