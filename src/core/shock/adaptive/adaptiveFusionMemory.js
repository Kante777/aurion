"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveFusionMemory = void 0;
class AdaptiveFusionMemory {
    memory = [];
    add(entry) {
        this.memory.push(entry);
        // prevent memory explosion
        if (this.memory.length > 500) {
            this.memory.shift();
        }
    }
    recent(n = 50) {
        return this.memory.slice(-n);
    }
    all() {
        return this.memory;
    }
}
exports.AdaptiveFusionMemory = AdaptiveFusionMemory;
