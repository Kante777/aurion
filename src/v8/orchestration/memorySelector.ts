import {
  CognitiveExperience
} from "../evolution/experience";


export class MemorySelector {


  select(
    memories: CognitiveExperience[],
    threshold = 0.5
  ) {


    return memories.filter(
      memory =>
        memory.relevanceScore >= threshold
    );

  }

}
