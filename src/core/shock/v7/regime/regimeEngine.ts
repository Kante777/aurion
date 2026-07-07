export type RegimeState =
  | "STABLE"
  | "VOLATILE"
  | "LIQUIDITY_DRIVEN"
  | "DISORDERED";


export interface RegimeEvidence {
  volatility:number;
  liquidity:number;
  spread:number;
}


export interface RegimeSignal {
  regime:RegimeState;
  confidence:number;
}


export class RegimeEngine {


  analyze(
    evidence:RegimeEvidence
  ):RegimeSignal {


    const volatility = evidence.volatility;
    const liquidity = evidence.liquidity;
    const spread = evidence.spread;


    if(volatility > 0.75){
      return {
        regime:"VOLATILE",
        confidence:volatility
      };
    }


    if(liquidity > 0.75){
      return {
        regime:"LIQUIDITY_DRIVEN",
        confidence:liquidity
      };
    }


    if(spread > 0.7){
      return {
        regime:"DISORDERED",
        confidence:spread
      };
    }


    return {
      regime:"STABLE",
      confidence:1-volatility
    };

  }

}


export const regimeEngine =
 new RegimeEngine();

