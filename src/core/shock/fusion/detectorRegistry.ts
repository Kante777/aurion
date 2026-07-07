import { ShockDetector } from "../../../cognition/evidence/ShockDetector";

export class DetectorRegistry {

    private detectors: ShockDetector<any>[] = [];

    register(detector: ShockDetector<any>) {
        const exists = this.detectors.find(d => d.name === detector.name);
        if (exists) return;
        this.detectors.push(detector);
    }

    remove(name: string) {
        this.detectors = this.detectors.filter(d => d.name !== name);
    }

    getAll(): ShockDetector<any>[] {
        return [...this.detectors];
    }

    clear() {
        this.detectors = [];
    }
}
