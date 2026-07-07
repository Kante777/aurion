

import {
 CognitiveSignal
} from "./attentionTypes";


export class SignalSalience {


 evaluate(
  signal:CognitiveSignal
 ):number {


  return (

   signal.impact *

   signal.confidence

  );


 }


}


