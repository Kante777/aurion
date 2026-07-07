import {
 CognitionEventType
} from "./eventTypes";


export interface CognitionEvent<T = unknown>{

    id:string;

    type:CognitionEventType;

    timestamp:number;

    payload:T;

}