import {
Scenario
}
from "./simulationTypes";


export class ScenarioEvaluator {



score(
scenario:Scenario
){



return (

scenario.probability
*
(1 -
scenario.risk)

);


}



rank(
scenarios:Scenario[]
){


return scenarios.sort(

(a,b)=>

this.score(b)
-
this.score(a)

);


}


}

