

import {
 MemoryNode
} from "./memoryNode";



export class SimilarityNetwork {



 similarity(
   a:MemoryNode,
   b:MemoryNode
 ){

   if(
     a.type !== b.type
   ){

     return 0;

   }


   return 0.5;

 }


}


