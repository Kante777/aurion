export class StabilityReporter {


report(
result:any
){


console.log(`

==========================================
AURION V8 COGNITIVE STABILITY TEST
==========================================

`);


console.log(
JSON.stringify(
result,
null,
2
)
);


}


}

