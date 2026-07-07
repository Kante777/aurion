import { regimeEngine } from "../v7/regime/regimeEngine";
import { applyRegimeToLearning } from "../v7/regime/applyRegimeToLearning";


console.log("\n==========================================");
console.log("      AETERNUM V7 REGIME TEST");
console.log("==========================================\n");


// VOLATILE MARKET
const volatileEvidence = {
  volatility: 0.95,
  liquidity: 0.40,
  spread: 0.80
};


const volatileSignal = regimeEngine.analyze(
  volatileEvidence
);


console.log("🔥 VOLATILE TEST");
console.log(volatileSignal);



const baseWeights = {

  volatility_detector: 0.33,
  liquidity_detector: 0.33,
  spread_detector: 0.34

};


const volatileWeights = applyRegimeToLearning(
  baseWeights,
  volatileSignal.regime
);


console.log("\n⚙️ VOLATILE ADAPTATION");
console.log(volatileWeights);



if(
  volatileWeights.volatility_detector <=
  baseWeights.volatility_detector
){

  throw new Error(
    "VOLATILE regime failed to increase volatility weighting"
  );

}



// STABLE MARKET

const stableEvidence = {

  volatility: 0.10,
  liquidity: 0.90,
  spread: 0.20

};


const stableSignal = regimeEngine.analyze(
  stableEvidence
);


console.log("\n🟢 STABLE TEST");
console.log(stableSignal);



const stableWeights = applyRegimeToLearning(
  baseWeights,
  stableSignal.regime
);


console.log("\n⚙️ STABLE ADAPTATION");
console.log(stableWeights);



if(
  stableWeights.liquidity_detector <=
  baseWeights.liquidity_detector
){

  throw new Error(
    "STABLE regime failed to increase liquidity weighting"
  );

}



// LIQUIDITY DRIVEN

const liquidityEvidence = {

  volatility: 0.35,
  liquidity: 0.95,
  spread: 0.25

};


const liquiditySignal = regimeEngine.analyze(
  liquidityEvidence
);


console.log("\n💧 LIQUIDITY TEST");
console.log(liquiditySignal);



const liquidityWeights = applyRegimeToLearning(
  baseWeights,
  liquiditySignal.regime
);


console.log("\n⚙️ LIQUIDITY ADAPTATION");
console.log(liquidityWeights);



console.log("\n==========================================");
console.log("✅ V7 REGIME INTELLIGENCE PASS");
console.log("==========================================\n");
