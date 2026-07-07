import {
RuntimeComponent
}
from "./runtimeTypes";


export class SystemRegistry {


private components:RuntimeComponent[]=[];



register(
name:string
){


this.components.push({

name,

status:"offline"

});


}



activate(){

this.components =
this.components.map(
component=>({

...component,

status:"online"

})
);

}



getComponents(){

return this.components;

}


}

