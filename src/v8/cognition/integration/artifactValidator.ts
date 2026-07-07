import {
CognitionArtifact
}
from "../output";


export class ArtifactValidator {



validate(
artifact:CognitionArtifact
){

return Boolean(

artifact.identity &&
artifact.trace &&
artifact.decision

);


}


}
