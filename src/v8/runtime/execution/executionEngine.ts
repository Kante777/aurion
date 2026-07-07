import {
CognitiveCycleRunner
}
from "../cycle";


import {
ExecutionController
}
from "./executionController";


import type {
ExecutionContext
}
from "./executionContext";


import type {
ExecutionResult
}
from "./executionResult";



export class ExecutionEngine {


private runner =
new CognitiveCycleRunner();


private controller =
new ExecutionController();



async execute(
context:ExecutionContext
):Promise<ExecutionResult>{


const start =
Date.now();



this.controller.start();



const result =
await this.runner.execute({

cycleId:
context.executionId,

currentPhase:
undefined as any,

input:
context.input,

startedAt:start

});



return {


executionId:
context.executionId,


success:
result.success,


output:
result.output,


duration:
Date.now()-start,


completedAt:
Date.now()


};


}


}
