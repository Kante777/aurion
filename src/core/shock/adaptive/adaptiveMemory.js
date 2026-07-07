"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveMemory = void 0;
class AdaptiveMemory {
    memory = [];
    add(record) {
        this.memory.push(record);
    }
    getAll() {
        return this.memory;
    }
    decay(limit = 50) {
        if (this.memory.length > limit) {
            this.memory = this.memory.slice(-limit);
        }
    }
}
exports.AdaptiveMemory = AdaptiveMemory;
