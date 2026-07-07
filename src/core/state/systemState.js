"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStateManager = void 0;
class SystemStateManager {
    state;
    constructor() {
        this.state = {
            timestamp: Date.now(),
            activeInstruments: [],
            regime: {},
            liquidityMap: {},
            narrativeMap: {},
            contradictionIndex: 0,
        };
    }
    update(partial) {
        this.state = {
            ...this.state,
            ...partial,
            timestamp: Date.now(),
        };
    }
    getState() {
        return this.state;
    }
}
exports.SystemStateManager = SystemStateManager;
