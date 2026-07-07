import {
ArtifactBuilder
}
from "../output";


import {
ArtifactRegistry
}
from "./artifactRegistry";


import {
ArtifactValidator
}
from "./artifactValidator";



export class ArtifactCoordinator {



private builder =
new ArtifactBuilder();



private registry =
new ArtifactRegistry();



private validator =
new ArtifactValidator();




create(
input:any
){


const artifact =
this.builder.build(
input
);



if(
!this.validator.validate(
artifact
)
){

throw new Error(
"Invalid cognition artifact"
);

}



return this.registry.register(
artifact
);


}



latest(){

return this.registry.latest();

}


}

