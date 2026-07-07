import { SystemClock } from "@time/SystemClock";

export class RealClock implements SystemClock {
    now(): number {
        return Date.now();
    }
}
