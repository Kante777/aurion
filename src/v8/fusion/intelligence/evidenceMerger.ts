import {
FusionEvidence
}
from "./fusionContracts";


export class EvidenceMerger {


merge(
evidence:FusionEvidence[]
){

return evidence.reduce(

(total,item)=>

total +
((item.score ?? item.strength ?? 0)
*
item.confidence),

0

);


}


}
