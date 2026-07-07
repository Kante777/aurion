export class RiskBoundary {



calculate(
context:any
){


return Math.min(
1,
(
context.uncertainty ?? 0
)
+
(
1 -
(context.confidence ?? 0)
)
);


}



withinLimit(
risk:number
){

return risk < 0.75;

}


}
