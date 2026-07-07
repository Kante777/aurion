

import {
 MemoryNode
} from "./memoryNode";


import {
 MemoryEdge
} from "./memoryEdge";



export class RelationshipEngine {


 compare(
   a:MemoryNode,
   b:MemoryNode
 ):MemoryEdge | null {


   if(a.type===b.type){


     return {

       from:a.id,

       to:b.id,

       relationship:"SIMILAR",

       strength:0.5

     };

   }


   return {

     from:a.id,

     to:b.id,

     relationship:"FOLLOWED",

     strength:0.3

   };


 }


}

