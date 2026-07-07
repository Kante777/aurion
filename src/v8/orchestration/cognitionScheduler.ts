export class CognitionScheduler {


  shouldExecute(
    confidence:number,
    threshold:number
  ) {


    return confidence >= threshold;

  }


}
