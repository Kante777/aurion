import {
  CognitionTrace
} from "./cognitionTrace";


export class CognitionMemory {


  private history:
    CognitionTrace[] = [];



  store(
    trace: CognitionTrace
  ): void {

    this.history.push(trace);

  }



  recent(
    limit = 10
  ):
  CognitionTrace[] {


    return this.history
      .slice(-limit);

  }



  size(): number {

    return this.history.length;

  }

}
