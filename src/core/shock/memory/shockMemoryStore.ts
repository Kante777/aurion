export interface ShockSnapshot {
    timestamp: number;
    shockScore: number;
    acceleration: number;
    divergence: number;
    state: string;
}

export class ShockMemoryStore {

    private memory: ShockSnapshot[] = [];

    add(snapshot: ShockSnapshot) {
        this.memory.push(snapshot);

        // keep memory bounded (important for performance)
        if (this.memory.length > 500) {
            this.memory.shift();
        }
    }

    getAll() {
        return this.memory;
    }

    getRecent(n: number) {
        return this.memory.slice(-n);
    }

    clear() {
        this.memory = [];
    }
}
