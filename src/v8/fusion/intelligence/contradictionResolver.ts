export class ContradictionResolver {


resolve(
scores:number[]
){

const max=Math.max(...scores);

const min=Math.min(...scores);


return {

conflict:
max-min,

stable:
(max-min)<0.5

};


}


}
