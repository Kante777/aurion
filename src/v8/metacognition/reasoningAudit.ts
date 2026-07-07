
export interface ReasoningAuditResult {

  evidenceCount:number;

  contradictionCount:number;

  reasoningStrength:number;

}



export class ReasoningAudit {


 audit(input:{
   evidence:any[];
   contradictions:any[];
 }) : ReasoningAuditResult {


   const evidenceStrength =
     Math.min(
       input.evidence.length / 10,
       1
     );


   const contradictionPenalty =
     Math.min(
       input.contradictions.length / 10,
       1
     );


   return {

     evidenceCount:
       input.evidence.length,


     contradictionCount:
       input.contradictions.length,


     reasoningStrength:
       Math.max(
         evidenceStrength - contradictionPenalty,
         0
       )

   };

 }

}

