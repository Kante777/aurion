

import {
 CognitiveSignal
} from "./attentionTypes";


export class AttentionScore {


 calculate(
  signal:CognitiveSignal
 ):number {


  return (

    signal.impact * 0.4 +

    signal.urgency * 0.3 +

    signal.novelty * 0.2 +

    signal.confidence * 0.1

  );


 }


}


