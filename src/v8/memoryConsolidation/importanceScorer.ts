

export class ImportanceScorer {


 score(
  confidence:number,
  impact:number,
  novelty:number
 ){

  return Number(
   (
    confidence * 0.4 +
    impact * 0.4 +
    novelty * 0.2
   )
   .toFixed(2)
  );


 }


}


