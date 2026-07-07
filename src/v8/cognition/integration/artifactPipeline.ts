import {
ArtifactCoordinator
}
from "./artifactCoordinator";



export class ArtifactPipeline {



private coordinator =
new ArtifactCoordinator();



process(
input:any
){


return this.coordinator.create(
input
);


}



}

