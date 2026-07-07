"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeliefStore = void 0;
class BeliefStore {
    beliefs = new Map();
    set(belief) {
        this.beliefs.set(belief.instrument, belief);
    }
    get(instrument) {
        return this.beliefs.get(instrument);
    }
    getAll() {
        return Array.from(this.beliefs.values());
    }
    clear() {
        this.beliefs.clear();
    }
}
exports.BeliefStore = BeliefStore;
