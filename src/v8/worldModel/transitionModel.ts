

import {
 WorldState
} from "./worldState";



export interface StateTransition {


 from:string;


 to:string;


 probability:number;


}



export class TransitionModel {


 predict(
   current:WorldState
 ):StateTransition[] {


   return [

    {

     from:current.id,

     to:"future-stable",

     probability:0.7

    }

   ];


 }


}


