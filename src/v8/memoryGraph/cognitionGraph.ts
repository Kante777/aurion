

import {
 MemoryNode
} from "./memoryNode";


import {
 MemoryEdge
} from "./memoryEdge";



export class CognitionGraph {


 private nodes:
   Map<string,MemoryNode>
   =
   new Map();



 private edges:
   MemoryEdge[]
   = [];



 addNode(
   node:MemoryNode
 ){

   this.nodes.set(
     node.id,
     node
   );

 }



 connect(
   edge:MemoryEdge
 ){

   this.edges.push(edge);

 }



 getNode(
   id:string
 ){

   return this.nodes.get(id);

 }



 getConnections(
   id:string
 ){

   return this.edges.filter(
     e =>
       e.from===id ||
       e.to===id
   );

 }



 size(){

   return {

     nodes:this.nodes.size,

     edges:this.edges.length

   };

 }


}

