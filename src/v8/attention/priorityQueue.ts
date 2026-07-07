

import {
 AttentionResult
} from "./attentionTypes";


export class PriorityQueue {


 private items:
 AttentionResult[] = [];


 add(
  item:AttentionResult
 ){

  this.items.push(item);


  this.items.sort(
   (a,b)=>b.score-a.score
  );


 }


 values(){

  return this.items;

 }


}


