import { BaseAgent } from "./baseAgent";

export class AgentManager {

  private agents: BaseAgent[] = [];

  register(agent: BaseAgent) {
    this.agents.push(agent);
  }

  run(state: any) {
    return this.agents.map(agent => agent.decide(state));
  }
}
