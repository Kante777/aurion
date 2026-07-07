import {
LearningSignal
}
from "./learningTypes";


export class LearningSignalGenerator {



generate(
expected:any,
actual:any,
confidence:number
):LearningSignal{


const accuracy =
JSON.stringify(expected)
===
JSON.stringify(actual)
?
1
:
0;



return {


accuracy,


confidence,


improvement:

accuracy -
confidence,


timestamp:
Date.now()


};


}


}

