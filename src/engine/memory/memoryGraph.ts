import { CompressedPattern } from "./memoryTypes";

export class MemoryGraph {

  private nodes: Map<string, CompressedPattern> = new Map();

  add(pattern: CompressedPattern) {
    this.nodes.set(pattern.id, pattern);
  }

  link(a: string, b: string, strength: number) {
    // placeholder for graph edges
    console.log(`Linking ${a} → ${b} (${strength})`);
  }

  queryTopPatterns(limit = 5) {
    return Array.from(this.nodes.values())
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, limit);
  }
}
