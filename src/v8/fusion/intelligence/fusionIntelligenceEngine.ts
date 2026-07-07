import {
EvidenceMerger
}
from "./evidenceMerger";


import {
ConfidenceResolver
}
from "./confidenceResolver";


import {
CognitionScorer
}
from "./cognitionScorer";


import {
FusionEvidence,
FusionResult
}
from "./fusionContracts";



export class FusionIntelligenceEngine {



private merger =
new EvidenceMerger();



private confidence =
new ConfidenceResolver();



private scorer =
new CognitionScorer();



process(
evidence:FusionEvidence[]
):FusionResult{


const merged =
this.merger.merge(
evidence
);



const confidence =
this.confidence.resolve(

evidence.map(
item=>item.confidence
)

);



const score =
this.scorer.score(
confidence,
merged
);



return {

score,

confidence,

evidence:
merged,


decisionReady:
score >= 0.6

};


}



evaluate(
evidence:FusionEvidence[]
){

return this.process(evidence);

}



}
