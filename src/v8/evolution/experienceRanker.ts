import {
  CognitiveExperience
} from "./experience";


export class ExperienceRanker {


  rank(
    experiences:
      CognitiveExperience[]
  ) {


    return [
      ...experiences
    ]
    .sort(
      (a,b) =>
        b.relevanceScore -
        a.relevanceScore
    );

  }

}
