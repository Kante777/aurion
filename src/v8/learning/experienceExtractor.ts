import {
LearningExperience
}
from "./learningTypes";


export class ExperienceExtractor {



extract(
artifact:any,
signal:any
):LearningExperience{


return {


pattern:

artifact.identity?.cycleId
??
"unknown",



result:

signal.accuracy >= 0.5
?
"SUCCESS"
:
"FAILURE",



signal,


payload:

artifact


};


}


}

