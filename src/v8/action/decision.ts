import {
  CognitiveIntent
} from "./intent";


export interface Decision {

  intent: CognitiveIntent;

  approved: boolean;

  explanation: string;
}
