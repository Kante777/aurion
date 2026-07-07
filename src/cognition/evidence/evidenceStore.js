"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceStore = void 0;
class EvidenceStore {
    evidence = [];
    add(e) {
        this.evidence.push(e);
    }
    getAll() {
        return this.evidence;
    }
    getByInstrument(instrument) {
        return this.evidence.filter(e => e.instrument === instrument);
    }
    getBySource(source) {
        return this.evidence.filter(e => e.source === source);
    }
    getByCategory(category) {
        return this.evidence.filter(e => e.category === category);
    }
    clear() {
        this.evidence = [];
    }
}
exports.EvidenceStore = EvidenceStore;
