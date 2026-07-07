

import {
 CognitionGraph
} from "./cognitionGraph";



export class KnowledgeTraversal {


 constructor(
   private graph:CognitionGraph
 ){}



 explore(
   id:string
 ){

   return this.graph
     .getConnections(id);

 }


}

