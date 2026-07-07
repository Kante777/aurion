import {
  FusionResult
} from "../../fusion/intelligence";


export interface FusionState {

  cognitionScore:number;

  confidence:number;

  stable:boolean;

  timestamp:number;

}



export class FusionStateMapper {


  map(
    result:FusionResult
  ):FusionState {


    return {

      cognitionScore:
        result.score,


      confidence:
        result.confidence,


      stable:
        result.decisionReady,


      timestamp:
        Date.now()

    };

  }

}
