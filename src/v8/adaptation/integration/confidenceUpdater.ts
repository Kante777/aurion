export class ConfidenceUpdater {


update(
current:number,
feedback:any
){


const adjustment =
feedback.confidenceDelta * 0.1;



return Math.max(
0,
Math.min(
1,
current + adjustment
)
);


}


}
