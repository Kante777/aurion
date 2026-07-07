import {
ScenarioGenerator
}
from "./scenarioGenerator";


import {
ScenarioEvaluator
}
from "./scenarioEvaluator";


import {
StatePredictor
}
from "./statePredictor";



export class SimulationEngine {



private generator =
new ScenarioGenerator();


private evaluator =
new ScenarioEvaluator();


private predictor =
new StatePredictor();




simulate(
state:any
){



const predicted =
this.predictor.predict(
state
);



const scenarios =
this.generator.generate(
predicted
);



const ranked =
this.evaluator.rank(
scenarios
);



return {


scenarios:ranked,


bestScenario:

ranked[0],


confidence:

ranked[0]?.probability ?? 0,


timestamp:

Date.now()


};


}


}

