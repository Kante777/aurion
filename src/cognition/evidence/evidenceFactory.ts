import { Evidence } from "./evidenceTypes";
import { randomUUID } from "crypto";

export class EvidenceFactory {
  static create(input: Omit<Evidence, "id" | "timestamp">): Evidence {
    return {
      id: randomUUID(),
      timestamp: Date.now(),
      ...input,
    };
  }
}
