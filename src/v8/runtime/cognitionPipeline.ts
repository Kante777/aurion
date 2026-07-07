import {
CognitionBus
}
from "../events";


import {
CognitionEventType
}
from "../events";


export class CognitionPipeline {


constructor(
private bus:CognitionBus
){}



execute(
input:any
){


this.bus.publish({

id:
crypto.randomUUID(),

type:
CognitionEventType.MARKET_RECEIVED,

timestamp:
Date.now(),

payload:
input

});


return {

success:true,

timestamp:
Date.now()

};


}


}