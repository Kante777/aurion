import {
  LearningSignal
} from "./learningSignal";


export class PerformanceTracker {


  private signals:
    LearningSignal[] = [];



  add(
    signal: LearningSignal
  ) {

    this.signals.push(
      signal
    );

  }



  recent(
    limit = 20
  ) {

    return this.signals
      .slice(-limit);

  }



  successRate(): number {


    if(
      this.signals.length === 0
    ) {

      return 0;

    }


    const successes =
      this.signals.filter(
        s => s.success
      ).length;


    return (
      successes /
      this.signals.length
    );

  }

}
