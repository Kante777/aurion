

export class ConfidenceAnalyzer {


 analyze(
   predicted:number,
   outcome:number
 ) {


   const error =
     Math.abs(
       predicted - outcome
     );


   return {

     error,

     accuracy:
       1 - Math.min(error,1)

   };


 }


}


