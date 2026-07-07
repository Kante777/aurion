export class RuntimeRecovery {



recover(
checkpoint:any
){


return {


restored:true,


state:
checkpoint?.state ?? null,


timestamp:
Date.now()


};


}



}

