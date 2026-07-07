"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineBridge = void 0;
const evidenceFactory_1 = require("../evidence/evidenceFactory");
class EngineBridge {
    evidence;
    constructor(evidence) {
        this.evidence = evidence;
    }
    emit(params) {
        const evidence = evidenceFactory_1.EvidenceFactory.create(params);
        this.evidence.emit(evidence);
    }
}
exports.EngineBridge = EngineBridge;
