export class CognitionSimilarity {


  compare(
    a: unknown,
    b: unknown
  ): number {


    const left =
      JSON.stringify(a);


    const right =
      JSON.stringify(b);


    if(
      left === right
    ) {

      return 1;

    }


    return 0;

  }

}
