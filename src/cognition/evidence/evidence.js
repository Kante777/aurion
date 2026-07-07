"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceCore = void 0;
class EvidenceCore {
    store;
    constructor(store) {
        this.store = store;
    }
    emit(evidence) {
        this.store.add(evidence);
    }
    queryAll() {
        return this.store.getAll();
    }
    queryInstrument(instrument) {
        return this.store.getByInstrument(instrument);
    }
}
exports.EvidenceCore = EvidenceCore;
