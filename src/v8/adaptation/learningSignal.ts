export interface LearningSignal {

  cognitionId: string;

  timestamp: number;


  expectedOutcome: unknown;


  actualOutcome: unknown;


  success: boolean;


  impactScore: number;

}
