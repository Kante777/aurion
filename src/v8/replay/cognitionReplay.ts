import {
HistoricalContext
}
from "./historicalContext";


import {
PatternMatcher
}
from "./patternMatcher";


import {
ReplayResult
}
from "./replayTypes";



export class CognitionReplay {



private context =
new HistoricalContext();



private matcher =
new PatternMatcher();




replay(
current:any
):ReplayResult{


const history =
this.context
.retrieve()
.map(
item=>item.artifact
);



const matches =
this.matcher.compare(
current,
history
);



return {


matches,


confidence:

matches.length
?
Math.max(
...matches.map(
m=>m.similarity
)
)
:
0


};


}




remember(
artifact:any,
outcome?:unknown
){

this.context.store({

artifact,

outcome,

createdAt:
Date.now()

});


}


}

