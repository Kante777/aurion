export class OutcomeAnalyzer {



evaluate(
prediction:any,
outcome:any
){


return {


success:
JSON.stringify(prediction)
===
JSON.stringify(outcome),


timestamp:
Date.now()


};


}


}

