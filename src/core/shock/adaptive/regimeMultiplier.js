"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeMultiplier = void 0;
class RegimeMultiplier {
    static get(regime) {
        switch (regime) {
            case "STABLE":
                return 0.8;
            case "ACTIVE":
                return 1.0;
            case "CRISIS":
                return 1.35;
            default:
                return 1.0;
        }
    }
}
exports.RegimeMultiplier = RegimeMultiplier;
