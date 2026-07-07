
import { FusionCore } from "../../fusion/fusionCore";


export function feedback(
 fusion:FusionCore,
 state:string,
 evidence:any[],
 result:any
){

 const bridge =
   fusion.getAdaptiveBridge();


 return bridge.applyOutcome(
   state,
   evidence,
   result
 );

}

