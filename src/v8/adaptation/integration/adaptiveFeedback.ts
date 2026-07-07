export interface AdaptiveFeedback {

accuracy:number;

confidenceDelta:number;

performanceDelta:number;

timestamp:number;

}


export class AdaptiveFeedbackGenerator {


generate(
signal:any
):AdaptiveFeedback{


return {

accuracy:
signal.accuracy ?? 0,


confidenceDelta:
signal.improvement ?? 0,


performanceDelta:
(signal.accuracy ?? 0) -
(signal.confidence ?? 0),


timestamp:
Date.now()

};


}


}
