"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentManager = void 0;
class AgentManager {
    agents = [];
    register(agent) {
        this.agents.push(agent);
    }
    run(state) {
        return this.agents.map(agent => agent.decide(state));
    }
}
exports.AgentManager = AgentManager;
