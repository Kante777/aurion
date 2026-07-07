"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectorRegistry = void 0;
class DetectorRegistry {
    detectors = [];
    register(detector) {
        const exists = this.detectors.find(d => d.name === detector.name);
        if (exists)
            return;
        this.detectors.push(detector);
    }
    remove(name) {
        this.detectors = this.detectors.filter(d => d.name !== name);
    }
    getAll() {
        return [...this.detectors];
    }
    clear() {
        this.detectors = [];
    }
}
exports.DetectorRegistry = DetectorRegistry;
