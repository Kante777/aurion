import {
 CognitionEvent
} from "./cognitionEvent";


import {
 CognitionEventType
} from "./eventTypes";


type Handler =
(event:CognitionEvent)=>void;



export class CognitionBus{


private handlers:
Map<CognitionEventType, Handler[]>
=
new Map();



subscribe(
type:CognitionEventType,
handler:Handler
){

const existing =
this.handlers.get(type)
|| [];


existing.push(handler);


this.handlers.set(
type,
existing
);

}



publish(
event:CognitionEvent
){

const listeners =
this.handlers.get(
event.type
)
|| [];


for(const listener of listeners){

listener(event);

}


}



}