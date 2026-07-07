import {
CognitiveState
}
from "../../state";


export interface StateSyncRequest {

state:CognitiveState;

event:string;

timestamp:number;

}


export interface StateSyncResult {

success:boolean;

previous:CognitiveState|null;

current:CognitiveState;

}

