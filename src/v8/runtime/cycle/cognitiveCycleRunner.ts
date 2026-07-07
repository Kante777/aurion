import {
  cognitionPipeline
} from "../../kernel/pipeline/index";


import {
  FusionRuntimeBridge
} from "../../integration/fusion";


import {
  CycleValidator
} from "./cycleValidator";


import type {
  CognitiveCycleContext
} from "./cycleContext";


import type {
  CognitiveCycleResult
} from "./cycleResult";


export class CognitiveCycleRunner {


private pipeline =
new cognitionPipeline();


private fusion =
new FusionRuntimeBridge();


private validator =
new CycleValidator();



async execute(
 context:CognitiveCycleContext
):Promise<CognitiveCycleResult>{


const start =
Date.now();



if(
 !this.validator.validate(context)
){

return {

cycleId:
context.cycleId,

success:false,

output:null,

phasesCompleted:[],

startedAt:start,

completedAt:Date.now(),

duration:
Date.now()-start

};

}



const perception =
await this.pipeline.run(
 context.input
);



const fusionResult =
this.fusion.execute({

perception,

understanding:
null,

reasoning:
null

});



const completed =
Date.now();



return {


cycleId:
context.cycleId,


success:true,


output:
fusionResult,


phasesCompleted:[

"PERCEPTION",

"UNDERSTANDING",

"REASONING",

"FUSION"

],


startedAt:start,


completedAt:completed,


duration:
completed-start


};


}


}
