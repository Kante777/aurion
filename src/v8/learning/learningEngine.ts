import {
ExperienceExtractor
}
from "./experienceExtractor";


import {
LearningSignalGenerator
}
from "./learningSignal";



export class LearningEngine {



private extractor =
new ExperienceExtractor();



private signal =
new LearningSignalGenerator();



learn(
artifact:any,
expected:any,
actual:any,
confidence:number
){



const learningSignal =
this.signal.generate(
expected,
actual,
confidence
);



return this.extractor.extract(
artifact,
learningSignal
);


}


}

