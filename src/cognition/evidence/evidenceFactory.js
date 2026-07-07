"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceFactory = void 0;
const crypto_1 = require("crypto");
class EvidenceFactory {
    static create(input) {
        return {
            id: (0, crypto_1.randomUUID)(),
            timestamp: Date.now(),
            ...input,
        };
    }
}
exports.EvidenceFactory = EvidenceFactory;
