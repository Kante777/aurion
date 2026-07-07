import {
CognitionArtifact
}
from "./cognitionArtifact";


export class ArtifactBuilder {


build(
input:Partial<CognitionArtifact>
):CognitionArtifact{


return {


identity:

input.identity ?? {

cycleId:
`cycle-${Date.now()}`,

createdAt:
Date.now(),

version:
"V8"

},


snapshot:

input.snapshot ?? {

state:null,

fusion:null,

memory:null

},


trace:

input.trace ?? [],


decision:

input.decision ?? {

ready:false,

intent:"NONE",

confidence:0,

reason:"No decision"

}


};


}


}

