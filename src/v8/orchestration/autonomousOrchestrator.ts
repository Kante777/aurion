import {
  MemorySelector
} from "./memorySelector";


import {
  ReasoningRouter
} from "./reasoningRouter";


import {
  ResourceAllocator
} from "./resourceAllocator";


import {
  CognitionScheduler
} from "./cognitionScheduler";



export class AutonomousOrchestrator {


 private memory =
   new MemorySelector();


 private router =
   new ReasoningRouter();


 private resources =
   new ResourceAllocator();


 private scheduler =
   new CognitionScheduler();



 orchestrate(input:{
   memories:any[];
   complexity:number;
   confidence:number;
 }) {


   const selectedMemory =
     this.memory.select(
       input.memories
     );


   const reasoning =
     this.router.route(
       input.complexity
     );


   const budget =
     this.resources.allocate(
       input.complexity
     );


   const execute =
     this.scheduler.shouldExecute(
       input.confidence,
       0.6
     );



   return {

     selectedMemory,

     reasoning,

     budget,

     execute

   };

 }


}
