export class StateTransition {


transition(
from:string,
to:string
){

return {

from,

to,

timestamp:Date.now()

};

}


}
