"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryBuffer = void 0;
class MemoryBuffer {
    buffer = [];
    maxSize = 50;
    add(entry) {
        this.buffer.push(entry);
        if (this.buffer.length > this.maxSize) {
            this.buffer.shift();
        }
    }
    getAll() {
        return [...this.buffer];
    }
    getRecent(n) {
        return this.buffer.slice(-n);
    }
    clear() {
        this.buffer = [];
    }
}
exports.MemoryBuffer = MemoryBuffer;
