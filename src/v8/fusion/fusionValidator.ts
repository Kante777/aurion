import {
FusionContext
}
from "./fusionContext";


export class FusionValidator {


validate(
context:FusionContext
){

return Boolean(
context.cycleId &&
context.timestamp
);

}


}
