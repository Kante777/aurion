import {
SystemRegistry
}
from "./systemRegistry";


import {
ComponentLoader
}
from "./componentLoader";


export class CognitiveBoot {


private registry =
new SystemRegistry();



private loader =
new ComponentLoader(
this.registry
);



start(){


this.loader.load();


this.registry.activate();



return {


status:
"AURION ONLINE",


components:

this.registry.getComponents(),


timestamp:

Date.now()


};


}


}

