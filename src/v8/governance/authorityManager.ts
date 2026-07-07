export class AuthorityManager {



private authorities = [

"kernel",

"fusion",

"learning",

"evolution",

"simulation",

"orchestrator",

"integration_test"

];



hasAuthority(
source:string
){

return this.authorities.includes(
source
);


}


}
