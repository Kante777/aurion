

export interface FocusAllocation {


 target:string;


 resources:number;


}



export class ResourceFocus {


 allocate(
  target:string,
  amount:number
 ):FocusAllocation {


  return {

   target,

   resources:amount

  };


 }


}


