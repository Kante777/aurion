

import {
 CognitiveSignal,
 AttentionResult
} from "./attentionTypes";

import {
 AttentionScore
} from "./attentionScore";

import {
 PriorityQueue
} from "./priorityQueue";


export class AttentionEngine {


 private scorer =
 new AttentionScore();


 private queue =
 new PriorityQueue();



 evaluate(
  signals:CognitiveSignal[]
 ):AttentionResult[]{


  signals.forEach(signal=>{


   const score =
    this.scorer.calculate(signal);


   this.queue.add({

    signalId:
     signal.id,

    score,

    priority:
     this.priority(score)

   });


  });



  return this.queue.values();


 }



 private priority(
  score:number
 ) {


  if(score >=0.8)
    return "CRITICAL";


  if(score >=0.6)
    return "HIGH";


  if(score >=0.4)
    return "MEDIUM";


  return "LOW";


 }


}


