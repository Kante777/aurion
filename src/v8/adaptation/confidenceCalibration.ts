export class ConfidenceCalibration {


  private history:
    number[] = [];



  record(
    predicted: number,
    success: boolean
  ) {


    const accuracy =
      success
        ? predicted
        : 1 - predicted;


    this.history.push(
      accuracy
    );

  }



  score(): number {


    if(
      this.history.length === 0
    ) {

      return 0.5;

    }


    return (
      this.history.reduce(
        (a,b)=>a+b,
        0
      )
      /
      this.history.length
    );

  }


}
