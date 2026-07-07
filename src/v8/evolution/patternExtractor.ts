import {
  CognitiveExperience
} from "./experience";


export interface CognitionPattern {

  signature: string;

  occurrences: number;

  successRate: number;

}



export class PatternExtractor {


  extract(
    experiences:
      CognitiveExperience[]
  ): CognitionPattern[] {


    const map =
      new Map<string, CognitiveExperience[]>();


    for(
      const experience of experiences
    ) {


      const signature =
        JSON.stringify(
          experience.context
        );


      const existing =
        map.get(signature) ?? [];


      existing.push(
        experience
      );


      map.set(
        signature,
        existing
      );

    }



    return Array.from(
      map.entries()
    ).map(
      ([signature, values]) => ({

        signature,

        occurrences:
          values.length,

        successRate:
          values.filter(
            x => x.success
          ).length
          /
          values.length

      })
    );

  }

}
