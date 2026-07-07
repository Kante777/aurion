import {
  CognitiveInput,
  CognitiveOutput
} from "../contracts/cognition";


import {
  Hypothesis
} from "../reasoning";


import {
  CognitiveIntent
} from "./intent";


import {
  Decision
} from "./decision";


import {
  confidenceGate
} from "./confidenceGate";



export class ActionEngine {


  async execute(
    input:
      CognitiveInput<Hypothesis[]>
  ):
  Promise<CognitiveOutput<Decision>> {


    const hypothesis =
      input.payload[0];


    const approved =
      confidenceGate(
        hypothesis.confidence
      );


    const direction =
      hypothesis.name.includes(
        "BULLISH"
      )
      ? "BULLISH"
      :
      hypothesis.name.includes(
        "BEARISH"
      )
      ? "BEARISH"
      :
      "NEUTRAL";



    const intent:
      CognitiveIntent = {


      intent:
        approved
        ? "PREPARE"
        : "MONITOR",


      direction,


      confidence:
        hypothesis.confidence,


      risk:
        approved
        ? "MEDIUM"
        : "LOW",


      reasons:
        hypothesis.supportingEvidence
          .map(
            e =>
              `${e.category}:${String(e.value)}`
          ),


      timestamp:
        Date.now()
    };



    return {

      phase:
        "ACTION",


      confidence:
        hypothesis.confidence,


      result:
        {
          intent,

          approved,

          explanation:
            approved
            ?
            "Cognition confidence threshold satisfied"
            :
            "Confidence insufficient for escalation"
        },


      evidence:
        hypothesis.supportingEvidence
    };

  }

}
