

export interface FailureReport {

 reason:string;

 severity:number;

}



export class FailureAnalyzer {


 analyze(
   success:boolean,
   reason?:string
 ):FailureReport {


   if(success){

     return {

       reason:"none",

       severity:0

     };

   }


   return {

     reason:
       reason ?? "unknown",


     severity:1

   };


 }


}

