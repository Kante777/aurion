import { AdaptiveFusionBridgeV5 } from "../shock/adaptive/adaptiveFusionBridge";
import { regimeEngine } from "../shock/v7/regime/regimeEngine";
import { applyRegimeToLearning } from "../shock/v7/regime/applyRegimeToLearning";


export class FusionCore {

  private bridge: AdaptiveFusionBridgeV5;

  constructor(
    initial: Record<string, number> = {
      volatility_detector: 0.33,
      liquidity_detector: 0.33,
      spread_detector: 0.34
    }
  ) {

    this.bridge = new AdaptiveFusionBridgeV5();

  }


  fuse(evidence:any[]) {

    return this.bridge.fuse(evidence);

  }


  learn(
    state:string,
    evidence:any[],
    fusionResult:any
  ){

    const regime = regimeEngine.analyze({
      volatility: fusionResult.shockScore ?? 0,
      liquidity: evidence[1]?.score ?? 0,
      spread: evidence[2]?.score ?? 0
    });


    const adjusted =
      applyRegimeToLearning(
  this.bridge.getWeights(),
  regime.regime
);


    return this.bridge.applyOutcome(
      state,
      evidence,
      {
        ...fusionResult,
        adjustedWeights: adjusted
      }
    );

  }


  getBridge(){

    return this.bridge;

  }


  getAdaptiveBridge(){

    return this.bridge;

  }

}
