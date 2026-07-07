import {
CognitiveBoot
}
from "./cognitiveBoot";


export class IntegrationRuntime {


private boot =
new CognitiveBoot();



initialize(){


return this.boot.start();


}


}

