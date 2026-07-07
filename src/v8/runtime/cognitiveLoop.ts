import {
  CognitiveInput,
  CognitiveOutput,
  CognitiveModule
} from "../contracts/cognition";


export class CognitiveLoop {

  private modules: CognitiveModule<any, any>[] = [];


  register(module: CognitiveModule<any, any>) {
    this.modules.push(module);
  }


  async run(
    input: CognitiveInput
  ): Promise<CognitiveOutput[]> {

    const results: CognitiveOutput[] = [];

    let current = input;

    for (const module of this.modules) {

      const output =
        await module.execute(current);

      results.push(output);

      current = {
        ...current,
        payload: output.result,
        phase: output.phase
      };
    }

    return results;
  }
}
