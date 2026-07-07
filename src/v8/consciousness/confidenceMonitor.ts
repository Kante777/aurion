

export class ConfidenceMonitor {


 evaluate(
  confidence:number
 ){

  return {

   confidence,

   level:
    confidence >=0.8
    ? "HIGH"
    :
    confidence >=0.5
    ? "MEDIUM"
    :
    "LOW"

  };


 }


}


