export class CognitionScorer {


score(
confidence:number,
evidence:number
){

return (

confidence*0.6+

evidence*0.4

);


}


}
