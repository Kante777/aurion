export class ReasoningRouter {


  route(
    complexity:number
  ) {


    if(complexity > 0.8) {

      return {
        mode:"deep",
        iterations:5
      };

    }


    if(complexity > 0.4) {

      return {
        mode:"standard",
        iterations:3
      };

    }


    return {
      mode:"fast",
      iterations:1
    };

  }

}
