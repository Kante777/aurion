

import {
 ImportanceScorer
} from "./importanceScorer";


import {
 OutcomeEvaluator
} from "./outcomeEvaluator";


import {
 ConsolidationPolicy
} from "./consolidationPolicy";


import {
 MemoryRecord
} from "./memoryRecord";



export class MemoryConsolidator {


 private scorer =
 new ImportanceScorer();


 private evaluator =
 new OutcomeEvaluator();


 private policy =
 new ConsolidationPolicy();



 consolidate(
  event:string,
  confidence:number,
  impact:number,
  novelty:number,
  success:boolean
 ):MemoryRecord | null {



 const importance =
 this.scorer.score(
  confidence,
  impact,
  novelty
 );


 if(
  !this.policy.shouldStore(
   importance
  )
 ){

  return null;

 }



 return {


  id:
   crypto.randomUUID(),


  event,


  confidence,


  outcome:
   this.evaluator.evaluate(
    success
   ),


  importance,


  timestamp:
   Date.now(),


  tags:
   []


 };


 }


}


