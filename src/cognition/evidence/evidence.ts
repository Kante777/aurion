import { Evidence } from "./evidenceTypes";
import { EvidenceStore } from "./evidenceStore";

export class EvidenceCore {
  constructor(private store: EvidenceStore) {}

  emit(evidence: Evidence) {
    this.store.add(evidence);
  }

  queryAll() {
    return this.store.getAll();
  }

  queryInstrument(instrument: string) {
    return this.store.getByInstrument(instrument);
  }
}
