"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcsConnector = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../../config/env");
class FcsConnector {
    baseUrl = "https://api.fcsapi.com";
    async getRates(symbol) {
        const response = await axios_1.default.get(`${this.baseUrl}/forex/latest`, {
            params: {
                symbol,
                access_key: env_1.ENV.FCS_API_KEY,
            },
        });
        return response.data;
    }
}
exports.FcsConnector = FcsConnector;
