import {
  CognitiveInput,
  CognitiveOutput
} from "../contracts/cognition";

import {
  createMarketSnapshot,
  MarketObservation
} from "./marketSnapshot";


export class PerceptionEngine {


  async execute(
    input: CognitiveInput<MarketObservation>
  ): Promise<CognitiveOutput> {


    const snapshot =
      createMarketSnapshot(
        input.payload
      );


    return {

      phase: "PERCEPTION",

      confidence: 1,

      result: snapshot,

      evidence: [
        {
          source:
            "market_observation",

          confidence: 1,

          value:
            snapshot
        }
      ]
    };
  }
}
