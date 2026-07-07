export interface CognitiveResources {

  memoryBudget:number;

  reasoningBudget:number;

}



export class ResourceAllocator {


  allocate(
    complexity:number
  ): CognitiveResources {


    return {

      memoryBudget:
        Math.ceil(
          complexity * 100
        ),


      reasoningBudget:
        Math.ceil(
          complexity * 10
        )

    };

  }

}
