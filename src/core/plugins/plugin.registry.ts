import { MarketPlugin } from "./plugin.interface";
import { MarketEvent } from "../contracts/marketEvent";
import { Evidence } from "../contracts/evidence";

export class PluginRegistry {
  private plugins: MarketPlugin[] = [];

  register(plugin: MarketPlugin) {
    this.plugins.push(plugin);
  }

  run(event: MarketEvent): Evidence[] {
    let results: Evidence[] = [];

    for (const plugin of this.plugins) {
      results = results.concat(plugin.analyze(event));
    }

    return results;
  }
}
