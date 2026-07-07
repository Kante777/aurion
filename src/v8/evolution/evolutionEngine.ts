import {
  CognitiveExperience
} from "./experience";


import {
  ExperienceMemory
} from "./experienceMemory";


import {
  PatternExtractor
} from "./patternExtractor";


import {
  ExperienceRanker
} from "./experienceRanker";



export class EvolutionEngine {


  private memory =
    new ExperienceMemory();


  private extractor =
    new PatternExtractor();


  private ranker =
    new ExperienceRanker();




  learn(
    experience:
      CognitiveExperience
  ) {

    this.memory.store(
      experience
    );


    return {

      stored:
        true,

      memorySize:
        this.memory.size()

    };

  }



  knowledge() {


    return {

      patterns:
        this.extractor.extract(
          this.memory.all()
        ),


      experiences:
        this.ranker.rank(
          this.memory.all()
        )

    };

  }

}
