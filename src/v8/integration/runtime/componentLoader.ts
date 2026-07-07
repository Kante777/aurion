import {
SystemRegistry
}
from "./systemRegistry";


export class ComponentLoader {


constructor(
private registry:SystemRegistry
){}



load(){

const systems=[

"kernel",

"pipeline",

"memory",

"fusion",

"learning",

"governance",

"simulation",

"orchestrator"

];



systems.forEach(

system=>

this.registry.register(
system
)

);


}



}

