import { MemoryEntry } from "./memoryTypes";

export class MemoryBuffer {
  private buffer: MemoryEntry[] = [];
  private maxSize = 50;

  add(entry: MemoryEntry) {
    this.buffer.push(entry);

    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  }

  getAll(): MemoryEntry[] {
    return [...this.buffer];
  }

  getRecent(n: number): MemoryEntry[] {
    return this.buffer.slice(-n);
  }

  clear() {
    this.buffer = [];
  }
}
