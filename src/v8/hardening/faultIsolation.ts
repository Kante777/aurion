import {
RuntimeFault
}
from "./hardeningTypes";


export class FaultIsolation {



capture(
component:string,
error:any
):RuntimeFault{


return {


component,


severity:"high",


message:
String(error),


timestamp:
Date.now()


};


}



}

