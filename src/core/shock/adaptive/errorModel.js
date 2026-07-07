"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = void 0;
class ErrorModel {
    map = {
        CALM: 0,
        ACTIVE: 1,
        FRAGILE: 2,
        CRISIS: 3
    };
    compute(predicted, actual) {
        const p = this.map[predicted] ?? 0;
        const a = this.map[actual] ?? 0;
        const diff = Math.abs(p - a);
        // normalized error (0 → 1)
        return diff / 3;
    }
}
exports.ErrorModel = ErrorModel;
