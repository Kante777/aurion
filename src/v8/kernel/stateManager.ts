export class StateManager{


private state:any = {};



update(
key:string,
value:any
){

this.state[key]=value;

}



snapshot(){

return {
...this.state
};

}


}