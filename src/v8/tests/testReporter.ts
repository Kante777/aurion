export class TestReporter {


report(
name:string,
result:any
){


console.log(
`
==========================================
${name}
==========================================

`,
JSON.stringify(
result,
null,
2
)

);


}


}

