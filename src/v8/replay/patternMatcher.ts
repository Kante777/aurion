import {
CognitionArtifact
}
from "../cognition/output";


import {
ReplayMatch
}
from "./replayTypes";



export class PatternMatcher {



compare(
current:CognitionArtifact,
history:CognitionArtifact[]
):ReplayMatch[]{



return history.map(
artifact=>({


artifact,


similarity:

this.similarity(
current,
artifact
)


})

);



}



private similarity(
a:CognitionArtifact,
b:CognitionArtifact
){


const traceA =
a.trace.length;


const traceB =
b.trace.length;



if(
traceA===0 ||
traceB===0
){

return 0;

}



return Math.min(
traceA,
traceB
)
/
Math.max(
traceA,
traceB
);


}


}

