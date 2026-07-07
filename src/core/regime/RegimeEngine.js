"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegimeEngine = void 0;
const RegimeScorer_1 = require("./RegimeScorer");
class RegimeEngine {
    scorer = new RegimeScorer_1.RegimeScorer();
    last = null;
    analyze(evidence) {
        const state = this.scorer.score(evidence);
        this.last = state;
        return state;
    }
    getLast() {
        return this.last;
    }
}
exports.RegimeEngine = RegimeEngine;
