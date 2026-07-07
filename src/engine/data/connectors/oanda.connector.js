"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OandaConnector = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../../config/env");
class OandaConnector {
    baseUrl;
    constructor() {
        this.baseUrl =
            env_1.ENV.OANDA_ENV === "practice"
                ? "https://api-fxpractice.oanda.com"
                : "https://api-fxtrade.oanda.com";
    }
    async getCandles(instrument, granularity) {
        const url = `${this.baseUrl}/v3/instruments/${instrument}/candles`;
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${env_1.ENV.OANDA_API_KEY}`,
            },
            params: {
                granularity,
                count: 100,
                price: "M",
            },
        });
        return response.data;
    }
}
exports.OandaConnector = OandaConnector;
