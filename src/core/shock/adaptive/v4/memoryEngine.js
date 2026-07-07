"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryEngine = void 0;
class MemoryEngine {
    memory = [];
    add(record) {
        this.memory.push(record);
        // keep bounded memory (prevents drift explosion)
        if (this.memory.length > 500) {
            this.memory.shift();
        }
    }
    getAll() {
        return this.memory;
    }
    getByRegime(regime) {
        return this.memory.filter(m => m.actualState === regime);
    }
    getErrorByRegime(regime) {
        const set = this.getByRegime(regime);
        if (set.length === 0)
            return 0;
        return set.reduce((a, b) => a + b.error, 0) / set.length;
    }
    getShockPersistence() {
        if (this.memory.length < 2)
            return 0;
        let persistence = 0;
        for (let i = 1; i < this.memory.length; i++) {
            if (this.memory[i].actualState === this.memory[i - 1].actualState) {
                persistence++;
            }
        }
        return persistence / (this.memory.length - 1);
    }
}
exports.MemoryEngine = MemoryEngine;
