import { EvidenceCore } from "../evidence/evidence";
import { EvidenceFactory } from "../evidence/evidenceFactory";
import { EvidenceSource, EvidenceCategory } from "../evidence/evidenceTypes";

export class EngineBridge {
  constructor(private evidence: EvidenceCore) {}

  emit(params: {
    source: EvidenceSource;
    instrument: string;
    category: EvidenceCategory;
    value: number;
    confidence: number;
    explanation: string;
    metadata?: any;
  }) {
    const evidence = EvidenceFactory.create(params);
    this.evidence.emit(evidence);
  }
}
