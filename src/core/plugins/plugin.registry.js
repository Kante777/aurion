"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRegistry = void 0;
class PluginRegistry {
    plugins = [];
    register(plugin) {
        this.plugins.push(plugin);
    }
    run(event) {
        let results = [];
        for (const plugin of this.plugins) {
            results = results.concat(plugin.analyze(event));
        }
        return results;
    }
}
exports.PluginRegistry = PluginRegistry;
