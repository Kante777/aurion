export class ExecutionController {


private active:boolean = false;


start(){

this.active=true;

}


stop(){

this.active=false;

}


isActive(){

return this.active;

}


}
