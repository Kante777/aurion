import {
ReplayRecord
}
from "./replayTypes";


export class HistoricalContext {



private history:ReplayRecord[]=[];



store(
record:ReplayRecord
){

this.history.push(
record
);

}



retrieve(){

return this.history;

}



latest(){

return this.history[
this.history.length-1
];

}



}

