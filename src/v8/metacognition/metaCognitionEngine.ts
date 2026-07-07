

import {
 ReasoningAudit
} from "./reasoningAudit";


import {
 ConfidenceAnalyzer
} from "./confidenceAnalyzer";


import {
 FailureAnalyzer
} from "./failureAnalyzer";


export class MetaCognitionEngine {


 private reasoning =
   new ReasoningAudit();


 private confidence =
   new ConfidenceAnalyzer();


 private failure =
   new FailureAnalyzer();



 evaluate(input:{
   evidence:any[];
   contradictions:any[];
   confidence:number;
   outcome:number;
   success:boolean;
 }) {


   const reasoning =
     this.reasoning.audit({
       evidence:
         input.evidence,

       contradictions:
         input.contradictions
     });



   const confidence =
     this.confidence.analyze(
       input.confidence,
       input.outcome
     );



   const failure =
     this.failure.analyze(
       input.success
     );



   const overall =
     (
       reasoning.reasoningStrength +
       confidence.accuracy +
       (1 - failure.severity)
     ) / 3;



   return {

     reasoning,

     confidence,

     failure,

     score:{

       overall

     }

   };

 }


}

