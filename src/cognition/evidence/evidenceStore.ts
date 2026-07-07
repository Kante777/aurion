import { Evidence } from "./evidenceTypes";

export class EvidenceStore {
  private evidence: Evidence[] = [];

  add(e: Evidence) {
    this.evidence.push(e);
  }

  getAll(): Evidence[] {
    return this.evidence;
  }

  getByInstrument(instrument: string): Evidence[] {
    return this.evidence.filter(e => e.instrument === instrument);
  }

  getBySource(source: string): Evidence[] {
    return this.evidence.filter(e => e.source === source);
  }

  getByCategory(category: string): Evidence[] {
    return this.evidence.filter(e => e.category === category);
  }

  clear() {
    this.evidence = [];
  }
}
