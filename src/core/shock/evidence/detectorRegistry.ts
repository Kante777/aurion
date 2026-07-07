import { ShockDetector } from "../interfaces/ShockDetector";

export class DetectorRegistry {

    private detectors: ShockDetector[] = [];

    register(detector: ShockDetector) {
        const exists = this.detectors.find(d => d.name === detector.name);
        if (exists) return;

        this.detectors.push(detector);
    }

    remove(name: string) {
        this.detectors = this.detectors.filter(d => d.name !== name);
    }

    getAll(): ShockDetector[] {
        return [...this.detectors];
    }

    clear() {
        this.detectors = [];
    }
}
