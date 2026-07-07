import {
  PerceptionEngine
} from "../perception";


import {
  UnderstandingEngine
} from "../understanding";


import {
  ReasoningEngine
} from "../reasoning";


import {
  ActionEngine
} from "../action";


import {
  CognitionMemory
} from "./cognitionMemory";


import {
  CognitionTrace
} from "./cognitionTrace";


import {
  CognitiveInput
} from "../contracts/cognition";



export class CognitionOrchestrator {


  private perception =
    new PerceptionEngine();


  private understanding =
    new UnderstandingEngine();


  private reasoning =
    new ReasoningEngine();


  private action =
    new ActionEngine();


  private memory =
    new CognitionMemory();



  async process(
    input: CognitiveInput<any>
  ) {



    const perception =
      await this.perception.execute(
        input
      );



    const understandingInput:
  CognitiveInput<any> = {

    phase:
      "UNDERSTANDING",

    context:
      input.context,

    payload:
      perception.result

};



    const understanding =
      await this.understanding.execute(
        understandingInput
      );



    const reasoningInput:
  CognitiveInput<any> = {

    phase:
      "REASONING",

    context:
      input.context,

    payload:
      understanding.result

};



    const reasoning =
      await this.reasoning.execute(
        reasoningInput
      );



    const actionInput:
  CognitiveInput<any> = {

    phase:
      "ACTION",

    context:
      input.context,

    payload:
      reasoning.result

};



    const action =
      await this.action.execute(
        actionInput
      );



    const trace:
      CognitionTrace = {


      id:
        crypto.randomUUID(),


      timestamp:
        Date.now(),


      perception:
        perception.result,


      understanding:
        understanding.result,


      reasoning:
        reasoning.result,


      action:
        action.result,


      confidence:
        action.confidence

    };



    this.memory.store(
      trace
    );



    return {

      trace,

      memorySize:
        this.memory.size()

    };

  }

}
