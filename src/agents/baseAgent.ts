import { AgentDecision } from "../engine/decision/decisionTypes";

export abstract class BaseAgent {
  constructor(
    public id: string,
    public name: string
  ) {}

  abstract decide(state: any): AgentDecision;
}
