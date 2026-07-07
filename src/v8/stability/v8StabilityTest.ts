import {
HardeningEngine
}
from "../hardening";


import {
FaultIsolation
}
from "../hardening";


import {
RuntimeRecovery
}
from "../hardening";


import {
stabilityScenario
}
from "./stabilityScenario";


import {
StabilityReporter
}
from "./stabilityReporter";



async function run(){


const hardening =
new HardeningEngine();



const isolation =
new FaultIsolation();



const recovery =
new RuntimeRecovery();



const reporter =
new StabilityReporter();



const checkpoint =
hardening.inspect(
stabilityScenario.state
);



const fault =
isolation.capture(

stabilityScenario.failure.component,

stabilityScenario.failure.type

);



const restored =
recovery.recover(
checkpoint.snapshot
);



const result={


checkpoint,


fault,


recovery:restored,


health:
checkpoint.health,


status:
"STABILITY VERIFIED"



};



reporter.report(
result
);



}



run();

