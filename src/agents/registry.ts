import { AgentManager } from "./agentManager";

import { ConservativeAgent } from "./impl/conservativeAgent";
import { AggressiveAgent } from "./impl/aggressiveAgent";
import { LiquidityAgent } from "./impl/liquidityAgent";

export function createAgents() {
  const manager = new AgentManager();

  manager.register(new ConservativeAgent("A1", "Conservative Fund"));
  manager.register(new AggressiveAgent("A2", "Aggressive Momentum"));
  manager.register(new LiquidityAgent("A3", "Liquidity Hunter"));

  return manager;
}
