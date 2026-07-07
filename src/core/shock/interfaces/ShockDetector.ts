import { ShockEvidence } from "./ShockEvidence";

export interface ShockDetector<T = unknown> {
    readonly name: string;

    detect(input: T): ShockEvidence | null;
}
