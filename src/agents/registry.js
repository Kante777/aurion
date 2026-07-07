"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgents = createAgents;
const agentManager_1 = require("./agentManager");
const conservativeAgent_1 = require("./impl/conservativeAgent");
const aggressiveAgent_1 = require("./impl/aggressiveAgent");
const liquidityAgent_1 = require("./impl/liquidityAgent");
function createAgents() {
    const manager = new agentManager_1.AgentManager();
    manager.register(new conservativeAgent_1.ConservativeAgent("A1", "Conservative Fund"));
    manager.register(new aggressiveAgent_1.AggressiveAgent("A2", "Aggressive Momentum"));
    manager.register(new liquidityAgent_1.LiquidityAgent("A3", "Liquidity Hunter"));
    return manager;
}
