export class FusionMemory {


private history:any[]=[];


store(
item:any
){

this.history.push(item);

}


retrieve(){

return this.history;

}


}
