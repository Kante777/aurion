

import {
 ScenarioEngine
} from "./scenarioEngine";


export class WorldSimulator {


 private scenarios =
   new ScenarioEngine();



 simulate(){

   return this.scenarios.generate();

 }


}


