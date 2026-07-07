"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditAssigner = void 0;
class CreditAssigner {
    assign(detectors, error) {
        const total = detectors.length;
        return detectors.map((d, i) => {
            // simple but powerful heuristic:
            // later detectors get slightly more responsibility bias
            const positionalWeight = (i + 1) / total;
            const responsibility = error * positionalWeight;
            return {
                detector: d,
                responsibility
            };
        });
    }
}
exports.CreditAssigner = CreditAssigner;
