

export interface PatternMemory {


pattern:string;


frequency:number;


confidence:number;


}


export class PatternStore {


 private patterns:
 PatternMemory[]=[];



 add(
  pattern:PatternMemory
 ){

  this.patterns.push(pattern);

 }



 getAll(){

  return this.patterns;

 }


}


