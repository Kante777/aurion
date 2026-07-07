

export interface Scenario {


 name:string;


 probability:number;


 outcome:string;


}



export class ScenarioEngine {


 generate():Scenario[] {


   return [

    {

     name:
      "continuation",

     probability:
      0.6,

     outcome:
      "trend continues"

    },

    {

     name:
      "reversal",

     probability:
      0.4,

     outcome:
      "market reverses"

    }

   ];


 }


}


