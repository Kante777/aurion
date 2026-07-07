export class StatePredictor {



predict(
state:any
){


return {


previous:
state,


predicted:

{

...state,

simulated:true

},


timestamp:

Date.now()


};


}


}

