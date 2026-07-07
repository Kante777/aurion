import {
  CognitiveInput,
  CognitiveOutput
} from "../contracts/cognition";


import {
  MarketState
} from "../understanding";


import {
  Evidence
} from "./evidence";


import {
  Hypothesis
} from "./hypothesis";


import {
  detectContradictions
} from "./contradictionEngine";


import {
  calculateProbability
} from "./probabilityEngine";



export class ReasoningEngine {


  async execute(
    input:
      CognitiveInput<MarketState>
  ):
  Promise<CognitiveOutput<Hypothesis[]>> {


    const state =
      input.payload;


    const evidence:
      Evidence[] = [

      {
        source:
          "market_state",

        category:
          "STRUCTURE",

        confidence:
          state.confidence,

        value:
          state.trend
      },


      {
        source:
          "regime_context",

        category:
          "REGIME",

        confidence:
          state.confidence,

        value:
          state.regime
      },


      {
        source:
          "liquidity_context",

        category:
          "LIQUIDITY",

        confidence:
          state.confidence,

        value:
          state.liquidity
      }
    ];



    const contradictions =
      detectContradictions(
        evidence
      );


    const probability =
      calculateProbability(
        evidence
      );



    const hypothesis:
      Hypothesis = {

      name:
        `${state.trend}_${state.structure}`,

      probability,

      supportingEvidence:
        evidence,

      contradictingEvidence:
        contradictions,

      confidence:
        probability
    };



    return {

      phase:
        "REASONING",

      confidence:
        probability,

      result:
        [
          hypothesis
        ],

      evidence
    };
  }
}
