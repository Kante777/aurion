import {
CognitionArtifact
}
from "../output";


export class ArtifactRegistry {


private artifacts:CognitionArtifact[]=[];



register(
artifact:CognitionArtifact
){

this.artifacts.push(
artifact
);

return artifact;

}



latest(){

return this.artifacts[
this.artifacts.length-1
];

}



all(){

return this.artifacts;

}


}
