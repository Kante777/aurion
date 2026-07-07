import {
  LearningSignal
} from "./learningSignal";


import {
  ConfidenceCalibration
} from "./confidenceCalibration";


import {
  PerformanceTracker
} from "./performanceTracker";



export class AdaptiveCognitionEngine {


  private calibration =
    new ConfidenceCalibration();


  private performance =
    new PerformanceTracker();




  learn(
    signal: LearningSignal
  ) {


    this.performance.add(
      signal
    );


    this.calibration.record(
      signal.impactScore,
      signal.success
    );


    return {

      confidenceAccuracy:
        this.calibration.score(),


      successRate:
        this.performance.successRate()

    };

  }



  state() {


    return {

      confidence:
        this.calibration.score(),


      performance:
        this.performance.successRate()

    };

  }

}
