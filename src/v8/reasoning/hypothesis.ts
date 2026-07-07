import {
  Evidence
} from "./evidence";


export interface Hypothesis {

  name: string;

  probability: number;

  supportingEvidence: Evidence[];

  contradictingEvidence: Evidence[];

  confidence: number;
}
