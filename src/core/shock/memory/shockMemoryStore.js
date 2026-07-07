"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShockMemoryStore = void 0;
class ShockMemoryStore {
    memory = [];
    add(snapshot) {
        this.memory.push(snapshot);
        // keep memory bounded (important for performance)
        if (this.memory.length > 500) {
            this.memory.shift();
        }
    }
    getAll() {
        return this.memory;
    }
    getRecent(n) {
        return this.memory.slice(-n);
    }
    clear() {
        this.memory = [];
    }
}
exports.ShockMemoryStore = ShockMemoryStore;
