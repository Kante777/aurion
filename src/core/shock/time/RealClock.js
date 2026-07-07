"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealClock = void 0;
class RealClock {
    now() {
        return Date.now();
    }
}
exports.RealClock = RealClock;
