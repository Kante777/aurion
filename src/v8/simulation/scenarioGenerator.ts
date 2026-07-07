import {
Scenario
}
from "./simulationTypes";


export class ScenarioGenerator {



generate(
state:any
):Scenario[]{



return [


{

id:"continuation",

description:
"State continues current trajectory",

probability:0.5,

risk:0.3,

state

},



{

id:"reversal",

description:
"State transitions into reversal",

probability:0.3,

risk:0.5,

state

},



{

id:"instability",

description:
"State enters unstable condition",

probability:0.2,

risk:0.8,

state

}


];


}


}

