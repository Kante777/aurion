import {
CognitionIdentity
}
from "./cognitionIdentity";


import {
CognitionTrace
}
from "./cognitionTrace";


import {
CognitionDecision
}
from "./cognitionDecision";


import {
CognitionSnapshot
}
from "./cognitionSnapshot";



export interface CognitionArtifact {


identity:CognitionIdentity;


snapshot:CognitionSnapshot;


trace:CognitionTrace[];


decision:CognitionDecision;


}

