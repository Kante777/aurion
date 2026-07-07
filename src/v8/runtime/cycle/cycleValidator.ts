import type {
  CognitiveCycleContext
} from "./cycleContext";


export class CycleValidator {


validate(
 context:CognitiveCycleContext
):boolean {


if(!context.cycleId)
return false;


if(!context.input)
return false;


return true;

}


}
