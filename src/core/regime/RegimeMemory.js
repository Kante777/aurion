"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeMemory = void 0;
class RegimeMemory {
    history = [];
    push(state) {
        this.history.push(state);
        if (this.history.length > 100)
            this.history.shift();
    }
    trend() {
        if (this.history.length < 5)
            return "INSUFFICIENT_DATA";
        const last5 = this.history.slice(-5);
        const vol = last5.reduce((s, r) => s + r.volatilityIndex, 0) / 5;
        if (vol > 0.7)
            return "ESCALATING";
        if (vol < 0.3)
            return "COOLING";
        return "STABLE_FLOW";
    }
}
exports.RegimeMemory = RegimeMemory;
