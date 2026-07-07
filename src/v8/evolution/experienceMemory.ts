import {
  CognitiveExperience
} from "./experience";


export class ExperienceMemory {


  private experiences:
    CognitiveExperience[] = [];



  store(
    experience: CognitiveExperience
  ) {

    this.experiences.push(
      experience
    );

  }



  all() {

    return [
      ...this.experiences
    ];

  }



  recent(
    limit = 50
  ) {

    return this.experiences
      .slice(-limit);

  }



  size() {

    return this.experiences.length;

  }

}
