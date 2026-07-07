import {
CognitionBus
} from "./cognitionBus";


import {
CognitionEvent
} from "./cognitionEvent";


export class EventRouter{


constructor(
private bus:CognitionBus
){}



route(
event:CognitionEvent
){

this.bus.publish(
event
);

}


}